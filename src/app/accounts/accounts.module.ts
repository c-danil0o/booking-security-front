import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './register/register.component';
import {RouterModule} from "@angular/router";
import {InputTextModule} from "primeng/inputtext";
import {CheckboxModule} from "primeng/checkbox";
import {RadioButtonModule} from "primeng/radiobutton";
import {PasswordModule} from "primeng/password";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import { EditAccountComponent } from './edit-account/edit-account.component';
import {DropdownModule} from "primeng/dropdown";
import {MatTooltipModule} from "@angular/material/tooltip";
import { RegistrationConfirmComponent } from './registration-confirm/registration-confirm.component';
import { EmailSentComponent } from './email-sent/email-sent.component';

@NgModule({
  declarations: [
    RegisterComponent,
    EditAccountComponent,
    RegistrationConfirmComponent,
    EmailSentComponent
  ],
  imports: [
    CommonModule, RouterModule,
    InputTextModule, CheckboxModule, RadioButtonModule, PasswordModule, FormsModule, ButtonModule, ReactiveFormsModule, DropdownModule, MatTooltipModule
  ]
})
export class AccountsModule {
}
