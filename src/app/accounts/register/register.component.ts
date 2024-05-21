import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";
import { countries } from "./countries";
import { AccountService } from "../services/account.service";
import { confirmPasswordValidator } from "./password.validator";
import { NewAccount } from "../../model/register-model";
import { Address } from "../../model/address-model";
import { F } from "@angular/cdk/keycodes";
import { KeycloakService } from 'src/app/infrastructure/auth/keycloak.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  account_type: string | undefined;
  registerForm: FormGroup
  user_id: number;
  constructor(private router: Router, private accountService: AccountService, private keycloakService: KeycloakService) {
  }
  ngOnInit() {
    this.keycloakService.accountConfirmed = false;
    this.user_id = this.keycloakService.getId();
    console.log(this.user_id);
    this.registerForm = new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.max(30)]),
      lastname: new FormControl('', [Validators.required, Validators.max(30)]),
      phone: new FormControl('', [Validators.required, Validators.pattern("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$")]),
      selectedCountry: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),


    }, [confirmPasswordValidator])
    this.registerForm.reset()
  }


  selectedCountry = { "name": "12", "code": "23" };

  register(): void {
    if (this.registerForm.valid) {
      console.log("valid")
      const address: Address = {
        country: this.registerForm.value.selectedCountry.name,
        street: this.registerForm.value.street,
        number: this.registerForm.value.number,
        city: this.registerForm.value.city,
      }
      const account: NewAccount = {
        id: this.user_id,
        firstName: this.registerForm.value.firstname,
        lastName: this.registerForm.value.lastname,
        phone: this.registerForm.value.phone,
        address: address,
        role: "Guest"
      }
      this.accountService.register(account).subscribe({
        next: (response: NewAccount) => {
          console.log(response)
          this.keycloakService.accountConfirmed = true;
          this.router.navigate(['/'])
        }
      })
    } else {
      console.log("invalid")
      this.registerForm.markAllAsTouched();
      for (const key of Object.keys(this.registerForm.controls)) {
        if (this.registerForm.controls[key].value == null || this.registerForm.controls[key].value.length === 0) {
          this.registerForm.controls[key].markAsDirty();
        }
      }
    }

  }

  protected readonly countries = countries;
}
