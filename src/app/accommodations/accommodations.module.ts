import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationListComponent } from './accommodation-list/accommodation-list.component';
import {ButtonModule} from "primeng/button";
import { RouterModule } from '@angular/router';
import { AccommodationPageComponent } from './accommodation-page/accommodation-page.component';



@NgModule({
  declarations: [
    AccommodationListComponent,
    AccommodationPageComponent
  ],
  imports: [
    CommonModule, RouterModule
  ]
})
export class AccommodationsModule { }
