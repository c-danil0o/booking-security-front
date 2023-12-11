import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { HostProfileComponent } from './host-profile/host-profile.component';
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {RatingModule} from "primeng/rating";
import {FormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    HostProfileComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    NgOptimizedImage,
    RatingModule,
    FormsModule,
    RouterLink
  ]
})
export class ProfileModule { }
