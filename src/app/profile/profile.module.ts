import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { HostProfileComponent } from './host-profile/host-profile.component';
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {RatingModule} from "primeng/rating";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import { HostPropertiesComponent } from './host-properties/host-properties.component';
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";



@NgModule({
  declarations: [
    HostProfileComponent,
    HostPropertiesComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    NgOptimizedImage,
    RatingModule,
    FormsModule,
    RouterLink,
    TableModule,
    InputTextModule
  ]
})
export class ProfileModule { }
