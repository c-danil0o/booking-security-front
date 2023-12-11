import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent} from "./layout/home/home.component";
import {Router, RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./infrastructure/auth/login/login.component";
import {RegisterComponent} from "./accounts/register/register.component";
import { AccommodationListComponent } from './accommodations/accommodation-list/accommodation-list.component';
import { EditAccountComponent } from './accounts/edit-account/edit-account.component';
import {AccommodationDetailsComponent} from "./accommodations/accommodation-details/accommodation-details.component";
import {RegistrationConfirmComponent} from "./accounts/registration-confirm/registration-confirm.component";
import {EmailSentComponent} from "./accounts/email-sent/email-sent.component";


const routes: Routes = [
  {component: HomeComponent, path:""},
  {component: LoginComponent, path:"login"},
  {component: RegisterComponent, path:"register"},
  {component: AccommodationListComponent, path:"accommodation-list"},
  {component: AccommodationDetailsComponent, path:"accommodation-details/:accommodationId"},
  {component: EditAccountComponent, path:"edit-account"},
  {component: EmailSentComponent, path:"email-sent"},
  {component: RegistrationConfirmComponent, path:"registration-confirmation"}
  ];

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forRoot(routes)]
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
