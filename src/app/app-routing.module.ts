import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent} from "./layout/home/home.component";
import {Router, RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./accounts/login/login.component";
import {RegisterComponent} from "./accounts/register/register.component";
import { AccommodationListComponent } from './accommodations/accommodation-list/accommodation-list.component';
import { AccommodationPageComponent } from './accommodations/accommodation-page/accommodation-page.component';


const routes: Routes = [
  {component: HomeComponent, path:"home"},
  {component: LoginComponent, path:"login"},
  {component: RegisterComponent, path:"register"},
  {component: AccommodationListComponent, path:"accommodation-list"},
  {component: AccommodationPageComponent, path:"accommodation-page"}
  ];

@NgModule({
  declarations: [],
  imports: [
    [RouterModule.forRoot(routes)]
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
