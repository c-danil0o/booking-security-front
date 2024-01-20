import {ReservationStatus} from "../model/ReservationStatus";

const mockReservation1 ={
  startDate: new Date(2024, 3, 1),
  days: 3,
  price: 300,
  reservationStatus: ReservationStatus.Pending,
  accommodationId: 1,
  guestId: 6,
  hostId: 1,
  numberOfGuests: 3
};

export {mockReservation1}
