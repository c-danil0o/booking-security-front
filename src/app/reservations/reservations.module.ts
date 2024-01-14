import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostReservationsComponent } from './host-reservations/host-reservations.component';
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import { GuestReservationsComponent } from './guest-reservations/guest-reservations.component';
import {DialogModule} from "primeng/dialog";
import {InputTextareaModule} from "primeng/inputtextarea";
import {RatingModule} from "primeng/rating";
import {TooltipModule} from "primeng/tooltip";
import {CalendarModule} from "primeng/calendar";



@NgModule({
  declarations: [
    HostReservationsComponent,
    GuestReservationsComponent
  ],
    imports: [
        CommonModule,
        TableModule,
        InputTextModule,
        ButtonModule,
        FormsModule,
        DropdownModule,
        DialogModule,
        InputTextareaModule,
        ReactiveFormsModule,
        RatingModule,
        TooltipModule,
        CalendarModule
    ]
})
export class ReservationsModule { }
