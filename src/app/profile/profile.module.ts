import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { HostProfileComponent } from './host-profile/host-profile.component';
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {RatingModule} from "primeng/rating";
import {FormsModule} from "@angular/forms";
import {RouterLink, RouterLinkActive} from "@angular/router";
import { GuestProfileComponent } from './guest-profile/guest-profile.component';
import {AccommodationsModule} from "../accommodations/accommodations.module";
import {PaginatorModule} from "primeng/paginator";



@NgModule({
  declarations: [
    HostProfileComponent,
    GuestProfileComponent
  ],
    imports: [
        CommonModule,
        CardModule,
        ButtonModule,
        NgOptimizedImage,
        RatingModule,
        FormsModule,
        RouterLink,
        RouterLinkActive,
        AccommodationsModule,
        PaginatorModule
    ]
})
export class ProfileModule { }
