import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./login/login.component";

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {PasswordModule} from "primeng/password";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    PasswordModule,
    FormsModule,
    RouterLink,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
  exports:[
    LoginComponent
  ]
})
export class AuthModule { }
