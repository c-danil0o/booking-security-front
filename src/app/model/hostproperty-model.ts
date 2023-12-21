import {AccommodationStatus} from "./accommodation-status-model";

export interface HostProperty{
  id: number
  name: string;
  location: string;
  status: AccommodationStatus
}
