import {ReservationStatus} from "./ReservationStatus";
import {Accommodation} from "./accommodation-model";
import {Guest} from "./guest-model";
import {DatePipe} from "@angular/common";

export interface Reservation{
  id:number;
  startDate:Date;
  endDate:Date;
  price:number;
  accommodationName: string;
  guestEmail: string;
  hostEmail: string
  reservationStatus:ReservationStatus;
  numberOfGuests: number;
}
