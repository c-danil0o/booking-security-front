import { Review } from "./review";

export class Accommodation {
    name: string;
    description: string;
    amenities: Array<string>;
    maxGuest: number;
    minGuest: number;
    photos: Array<string>;
    pricePerGuest: boolean;
    cancellationDeadline: number;
    autoApproval: boolean;
    averageGrade: number;
    roomNumber: number;
    reviews: Array<Review>;
    
    constructor(name: string, description: string, amenities: Array<string>, maxGuest: number, minGuest: number, photos: Array<string>, pricePerGuest: boolean, cancellationDeadline: number, autoApproval: boolean, averageGrade: number, roomNumber: number, reviews: Array<Review>) {
        this.name = name;
        this.description = description;
        this.amenities = amenities;
        this.maxGuest = maxGuest;
        this.minGuest = minGuest;
        this.photos = photos;
        this.pricePerGuest = pricePerGuest;
        this.cancellationDeadline = cancellationDeadline;
        this.autoApproval = autoApproval;
        this.averageGrade = averageGrade;
        this.roomNumber = roomNumber;
        this.reviews = reviews;
    }
}
