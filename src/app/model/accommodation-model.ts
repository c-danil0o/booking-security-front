import { Address } from "../../address";
import { Review } from "./review-model";

export class Accommodation {
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

    constructor(name: string, description: string, amenities: Array<string>, maxGuests: number, minGuests: number, photos: Array<string>, pricePerGuest: boolean, cancellationDeadline: number, autoApproval: boolean, averageGrade: number, roomNumber: number, reviews: Array<Review>, address: Address) {
        this.name = name;
        this.description = description;
        this.amenities = amenities;
        this.maxGuests = maxGuests;
        this.minGuests = minGuests;
        this.photos = photos;
        this.pricePerGuest = pricePerGuest;
        this.cancellationDeadline = cancellationDeadline;
        this.autoApproval = autoApproval;
        this.averageGrade = averageGrade;
        this.roomNumber = roomNumber;
        this.reviews = reviews;
        this.address = address;
    }
}
