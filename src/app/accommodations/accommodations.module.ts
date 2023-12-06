import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccommodationListComponent } from './accommodation-list/accommodation-list.component';
import {ButtonModule} from "primeng/button";
import { RouterModule } from '@angular/router';
import { AccommodationDetailsComponent } from './accommodation-details/accommodation-details.component';
import {HttpClientModule} from "@angular/common/http";
import { AccommodationCardComponent } from './accommodation-card/accommodation-card.component';
import {CardModule} from "primeng/card";



@NgModule({
  declarations: [
    AccommodationListComponent,
    AccommodationDetailsComponent,
    AccommodationCardComponent,
  ],
  imports: [
    CommonModule, RouterModule, HttpClientModule, CardModule
  ]
})
export class AccommodationsModule { }
