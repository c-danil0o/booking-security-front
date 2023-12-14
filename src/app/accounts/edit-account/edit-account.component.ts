import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/auth/auth.service';
import { HostService } from '../services/host.service';
import { GuestService } from '../services/guest.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { countries } from '../register/countries';
import { Address } from 'src/app/model/address-model';
import { E } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent {
  account: any;
  editAccountForm: FormGroup;

  constructor(private authService: AuthService, private route: ActivatedRoute, private hostService: HostService, private guestService: GuestService) {}

  // ngOnInit() {
  //   this.editAccountForm = new FormGroup({
  //     firstname: new FormControl('', [Validators.required, Validators.max(30)]),
  //     lastname: new FormControl('', [Validators.required, Validators.max(30)]),
  //     phone: new FormControl('', [Validators.required, Validators.pattern("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$")]),
  //     selectedCountry: new FormControl('', Validators.required),
  //     street: new FormControl('', Validators.required),
  //     city: new FormControl('', Validators.required),
  //     number: new FormControl('', Validators.required),
  //     email: new FormControl('', [Validators.required, Validators.email]),
  //     // oldpassword: new FormControl('', Validators.required),
  //     // newpassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  //   })//, [confirmPasswordValidator])
    
  //   // read coresponding data and patch to the form
  //   this.route.params.subscribe(params => {
  //     const userId = params['id'];
  //     if(this.authService.getRole().toUpperCase() === 'ROLE_ADMIN') {
  //     } if(this.authService.getRole().toUpperCase() === 'ROLE_HOST') {
  //       this.account = this.hostService.findById(userId).subscribe(data => {
  //         this.account = data = data;
  //         this.patchEditAccountForm();
  //       });        
  //     } else {
  //       this.account = this.guestService.findById(userId).subscribe(data => {
  //         this.account = data = data;
  //         this.patchEditAccountForm();
  //       });
  //     }
  //   });
  // }

  ngOnInit() {
    this.initializeEditAccountForm();
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
      // oldpassword: new FormControl('', Validators.required),
      // newpassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
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
      updateService.update(updatedAccountData).subscribe(
        successfulUpdate => {
          console.log('Successfully updated');
          this.account = updatedAccountData;
        },
        error => console.error(`Error updating account: ${error}`)
      );
    } else {
      console.log('Invalid form');
  
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
