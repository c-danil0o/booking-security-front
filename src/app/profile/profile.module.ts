import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {HostProfileComponent} from './host-profile/host-profile.component';
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {RatingModule} from "primeng/rating";
import {FormsModule} from "@angular/forms";
import {HostPropertiesComponent} from './host-properties/host-properties.component';
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {GuestProfileComponent} from './guest-profile/guest-profile.component';
import {AccommodationsModule} from "../accommodations/accommodations.module";
import {PaginatorModule} from "primeng/paginator";
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import {DialogModule} from "primeng/dialog";
import {InputTextareaModule} from "primeng/inputtextarea";


@NgModule({
  declarations: [
    HostProfileComponent,
    HostPropertiesComponent,
    GuestProfileComponent,
    AdminProfileComponent
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
        InputTextModule,


        RouterLinkActive,
        AccommodationsModule,
        PaginatorModule,
        DialogModule,
        InputTextareaModule
    ]
})
export class ProfileModule {
}
