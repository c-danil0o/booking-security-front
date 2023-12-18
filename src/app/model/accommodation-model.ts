
import { Review } from "./review-model";
import {Address} from "./address-model";
import {Host} from "./host-model";
import {Timeslot} from "./timeslot-model";
import {AccommodationStatus} from "./accommodation-status-model";

export interface Accommodation {
  id: number;
  name: string;
  description: string;
  amenities: string[];
  accommodationType: string;
  maxGuests: number;
  minGuests: number;
  photos: string[];
  pricePerGuest: boolean;
  cancellationDeadline: number;
  autoApproval: boolean;
  averageGrade: number;
  status: AccommodationStatus;
  roomNumber: number;
  reviews: Review[];
  address: Address;
  host: Host;
  availability: Timeslot[]
}
