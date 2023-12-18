import {Review} from "./review-model";
import {Address} from "./address-model";
import {Host} from "./host-model";
import {Timeslot} from "./timeslot-model";

export interface SearchedAccommodation {
  id: number;
  name: string;
  description: string;
  address: Address;
  accommodationType: string;
  amenities: string[];
  maxGuests: number;
  minGuests: number;
  photos: string[];
  cancellationDeadline: number;
  averageGrade: number;
  price: number;
  pricePerNight: number;
}
