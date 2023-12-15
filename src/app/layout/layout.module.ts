import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './navbar/navbar.component';
import {ButtonModule} from "primeng/button";
import {RouterModule} from "@angular/router";
import {InputNumberModule} from "primeng/inputnumber";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {InputTextModule} from "primeng/inputtext";
import {AccommodationsModule} from "../accommodations/accommodations.module";


@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent,
    NavbarComponent
  ],
  exports: [
    NavbarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    RouterModule,
    InputNumberModule,
    ReactiveFormsModule,
    CalendarModule,
    InputTextModule,
    FormsModule,
    AccommodationsModule
  ]
})
export class LayoutModule {
}
