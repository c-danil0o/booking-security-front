import { ReservationStatus } from "./ReservationStatus";
import { Guest } from "./guest-model";

export class New_reservation {
    startDate: Date;
    days: number;
    price: number;
    reservationStatus: ReservationStatus;
    accommodationId: number;
    guestId: number;
    hostId: number;
    numberOfGuests: number;
}
