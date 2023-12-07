import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './register/register.component';
import {RouterModule} from "@angular/router";
import {InputTextModule} from "primeng/inputtext";
import {CheckboxModule} from "primeng/checkbox";
import {RadioButtonModule} from "primeng/radiobutton";
import {PasswordModule} from "primeng/password";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import { EditAccountComponent } from './edit-account/edit-account.component';

@NgModule({
  declarations: [
    RegisterComponent,
    EditAccountComponent
  ],
  imports: [
    CommonModule, RouterModule,
    InputTextModule, CheckboxModule, RadioButtonModule, PasswordModule, FormsModule, ButtonModule
  ]
})
export class AccountsModule {
}
