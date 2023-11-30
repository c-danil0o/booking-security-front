import { Component, Input } from '@angular/core';
import accommodationData from '../accommodation-data.json';
import { Accommodation } from '../accommodation';
import { Address } from 'src/app/address';
import { Review } from '../review';

@Component({
  selector: 'app-accommodation-page',
  templateUrl: './accommodation-page.component.html',
  styleUrls: ['./accommodation-page.component.css']
})

export class AccommodationPageComponent {
  accommodation: Accommodation = accommodationData[0];

  accommodationPicture: string = this.accommodation.photos[1];
  name: string = this.accommodation.name;
  address: Address = this.accommodation.address;
  minGuests: number = this.accommodation.minGuests;
  maxGuests: number = this.accommodation.maxGuests;
  roomNumber: number = this.accommodation.roomNumber;
  description: string = this.accommodation.description;
  numberOfReviews: number = this.accommodation.reviews.length;
  averageGrade: number = this.accommodation.averageGrade;
  get stars() {
    return Array(Math.floor(this.averageGrade)).fill(0);
  }
  hostName: string = "John Smith";
  amenities: string[] = this.accommodation.amenities;
  reviews: Array<Review> = this.accommodation.reviews;
}
