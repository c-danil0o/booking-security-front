import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {countries} from "./countries";
import {Account} from "../../model/account-model";
import {AccountService} from "../services/account.service";
import {confirmPasswordValidator} from "./password.validator";
import {NewAccount} from "../../model/register-model";
import {Address} from "../../model/address-model";
import {F} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  account_type: string | undefined;
  registerForm: FormGroup
  constructor(private router: Router, private accountService: AccountService) {
  }
  ngOnInit() {
    this.registerForm = new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.max(30)]),
      lastname: new FormControl('', [Validators.required, Validators.max(30)]),
      phone: new FormControl('', [Validators.required, Validators.pattern("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$")]),
      selectedCountry: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      repeat_password: new FormControl('', Validators.required),
      account_type: new FormControl('', Validators.required)


    }, [confirmPasswordValidator])
    this.registerForm.reset()
  }


  selectedCountry = {"name": "12", "code": "23"};

  register(): void {
      if (this.registerForm.valid){
        console.log("valid")
        const address: Address = {
          country: this.registerForm.value.selectedCountry,
          street: this.registerForm.value.street,
          number: this.registerForm.value.number,
          city: this.registerForm.value.city,
        }
        const account: NewAccount = {
          email: this.registerForm.value.email,
          password: this.registerForm.value.password,
          firstName: this.registerForm.value.firstname,
          lastName: this.registerForm.value.lastname,
          phone: this.registerForm.value.phone,
          role: this.registerForm.value.account_type,
          address: address
        }
        this.accountService.register(account).subscribe({
          next: (response: NewAccount)=>{
            console.log(response)
            this.router.navigate(['/email-sent'])
          }
        })
      }else{
        console.log("invalid")
        this.registerForm.markAllAsTouched();
        for (const key of Object.keys(this.registerForm.controls)) {
          if(this.registerForm.controls[key].value == null  || this.registerForm.controls[key].value.length === 0) {
            this.registerForm.controls[key].markAsDirty();
          }
        }
      }

  }

  protected readonly countries = countries;
}
