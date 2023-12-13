import {Address} from "./address-model";
import {Timeslot} from "./timeslot-model";
import {Host} from "./host-model";

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
  isApproved: boolean;
  availability: Timeslot[];
  cancellationDeadline: number;
  isAutoApproval: boolean;
  host: Host;
}
