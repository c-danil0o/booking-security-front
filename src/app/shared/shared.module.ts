import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import { GoogleMapComponent } from './google-map/google-map.component';
import {GoogleMapsModule} from "@angular/google-maps";



@NgModule({
    declarations: [
        GoogleMapComponent
    ],
  exports: [
    GoogleMapComponent
  ],
  imports: [
    CommonModule,
    InputTextModule,
    PaginatorModule,
    GoogleMapsModule
  ]
})
export class SharedModule { }
