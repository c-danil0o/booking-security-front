import {Address} from "./address-model";
import {Timeslot} from "./timeslot-model";
import {Host} from "./host-model";
import {AccommodationStatus} from "./accommodation-status-model";

export interface New_accommodation{
  name: string;
  description: string;
  address: Address;
  accommodationType: string;
  amenities: string[];
  maxGuests: number;
  minGuests: number;
  photos: string[];
  isPricePerGuest: boolean;
  status: AccommodationStatus
  availability: Timeslot[];
  cancellationDeadline: number;
  isAutoApproval: boolean;
  host: Host;
}
