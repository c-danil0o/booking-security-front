import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule, Routes } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { HostService } from '../services/host.service';
import { GuestService } from '../services/guest.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { countries } from '../register/countries';
import { Address } from 'src/app/model/address-model';
import { E } from '@angular/cdk/keycodes';
import { AccountService } from '../services/account.service';
import { NewPassword } from 'src/app/model/password-change-model';
import { error } from '@angular/compiler-cli/src/transformers/util';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent {
  account: any;
  editAccountForm: FormGroup;
  changePasswordForm: FormGroup;

  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute, private accountService: AccountService, private hostService: HostService, private guestService: GuestService) {}


  ngOnInit() {
    this.initializeEditAccountForm();
    this.initializeChangePasswordForm();

    this.route.params.subscribe(params => {
      const userId = params['id'];
      if (this.authService.getRole().toUpperCase() === 'ROLE_HOST') {
        this.account = this.hostService.findById(userId).subscribe(data => {
          this.account = data;
          this.patchEditAccountForm();
        });
      } else {
        this.account = this.guestService.findById(userId).subscribe(data => {
          this.account = data;
          this.patchEditAccountForm();
        });
      }
    });
  }
  
  private initializeEditAccountForm(): void {
    this.editAccountForm = new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.max(30)]),
      lastname: new FormControl('', [Validators.required, Validators.max(30)]),
      phone: new FormControl('', [Validators.required, Validators.pattern("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$")]),
      selectedCountry: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  private initializeChangePasswordForm(): void {
    this.changePasswordForm = new FormGroup({
      oldpassword: new FormControl('', Validators.required),
      newpassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmedpassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }
  
  
  selectedCountry = {"name": "12", "code": "23"};
  protected readonly countries = countries;

  onSubmit(): void {
    if(this.editAccountForm.valid) {
      const updatedAccountData = {
        ...this.account,
        firstName: this.editAccountForm.value.firstname,
        lastName: this.editAccountForm.value.lastname,
        phone: this.editAccountForm.value.phone,
        email: this.editAccountForm.value.email,
        address: {
          ...this.account.address,
          street: this.editAccountForm.value.street,
          city: this.editAccountForm.value.city,
          number: this.editAccountForm.value.number,
          // country: this.editAccountForm.value.country
        }
      };


      const updateService = this.authService.getRole().toUpperCase() === 'ROLE_HOST' ? this.hostService : this.guestService;
      if(this.account.email === updatedAccountData.email) {
        updateService.update(updatedAccountData).subscribe(
          () => {
            this.account = updatedAccountData;
            alert('Account updated successfully');
          },
          error => {
            alert("An error occurred while updating, we're sorry for inconvenience");
            console.error(`Error updating account: ${error}`)
          }
        )
      } else {
        this.authService.logout().subscribe({
          next: (_) => {
            localStorage.removeItem('user');
            this.authService.setUser();
          }
        })
        updateService.update(updatedAccountData).subscribe(
          () => {
            this.account = updatedAccountData;
            alert('Account successfully updated. You will be logged out, so log in with new credentials.');
            this.router.navigate(['/login']);
          },
          error => {
            alert("An error occurred while updating, we're sorry for inconvenience");
            console.error(`Error updating account: ${error}`)
          }
        )  
      }
    } else {
      alert('Invalid data entered.\nPlease try again.');
  
      // print all invalid fields in the console
      this.editAccountForm.markAllAsTouched();
      for (const key of Object.keys(this.editAccountForm.controls)) {
        if (this.editAccountForm.controls[key].invalid) {
          console.log(`${key}:`, this.editAccountForm.controls[key].errors);
        }
      }
    }
  }

  onCancel(): void {
    this.editAccountForm.reset();
    this.patchEditAccountForm();
  }

  onDelete(): void {
    if(confirm('Are you sure you want to delete your account?')) {
      const deleteService = this.authService.getRole().toUpperCase() === 'ROLE_HOST' ? this.hostService : this.guestService;
      this.authService.logout().subscribe({
        next: (_) => {
          localStorage.removeItem('user');
          this.authService.setUser();
        }
      })
      deleteService.deleteAccount(this.account.id).subscribe(
        () => {
          alert("Account successfully deleted");
          this.router.navigate(['/']);
        }, 
        error => {
          console.log("Error deleting account " + JSON.stringify(error))
          alert("An error has occurred while trying to delete your account, we're sorry for inconvenience");
        }
      )
    }
  }

  onChangePassword(): void {
    if(this.changePasswordForm.valid && this.changePasswordForm.value.newpassword === this.changePasswordForm.value.confirmedpassword) {
      const newPassword: NewPassword = {
        email: this.account.email,
        oldPassword: this.changePasswordForm.value.oldpassword,
        newPassword: this.changePasswordForm.value.newpassword,
        confirmedPassword: this.changePasswordForm.value.confirmedpassword
      }

      this.accountService.changePassword(newPassword).subscribe(
        () => {
          alert("Password updated successfully\nYou'll be logged out so you can login with new credentials")
          this.authService.logout().subscribe({
            next: (_) => {
              localStorage.removeItem('user');
              this.authService.setUser();
              this.router.navigate(['/login']);
            }
          })
        },
        error => {
          alert("An error occurred while changing password, we're sorry for inconvenience");
          console.log("Error: " + error);
          console.error(`Error changing password: ${error}`)
        }
      )
    } else {
      alert('Incorrectly filled in data.\nPlease try again.');
  
      // print all invalid fields in the console
      this.editAccountForm.markAllAsTouched();
      for (const key of Object.keys(this.editAccountForm.controls)) {
        if (this.editAccountForm.controls[key].invalid) {
          console.log(`${key}:`, this.editAccountForm.controls[key].errors);
        }
      }
    }
  }

  patchEditAccountForm(): void {
    this.editAccountForm.patchValue({
      firstname: this.account.firstName,
      lastname: this.account.lastName,
      phone: this.account.phone,
      selectedCountry: this.account.address.country,
      street: this.account.address.street,
      city: this.account.address.city,
      number: this.account.address.number,
      email: this.account.email,
    })
  }
}
