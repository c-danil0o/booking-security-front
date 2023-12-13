import {Address} from "./address-model";

export interface AccommodationForm1Model{
  address: Address;
  name: string;
  amenities: string[];
  description: string;
  files: string[];
  accommodationType: string;
  minGuests: number;
  maxGuests: number;

}
