
import { Review } from "./review-model";
import {Address} from "./address-model";

export interface Accommodation {
    name: string;
    description: string;
    amenities: Array<string>;
    maxGuests: number;
    minGuests: number;
    photos: Array<string>;
    pricePerGuest: boolean;
    cancellationDeadline: number;
    autoApproval: boolean;
    averageGrade: number;
    roomNumber: number;
    reviews: Array<Review>;
    address: Address;


}
