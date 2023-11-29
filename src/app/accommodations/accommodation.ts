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
    averageGrade: DoubleRange;    
}
