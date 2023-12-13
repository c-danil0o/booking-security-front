import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostReservationsComponent } from './host-reservations/host-reservations.component';
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import { GuestReservationsComponent } from './guest-reservations/guest-reservations.component';



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
    DropdownModule
  ]
})
export class ReservationsModule { }
