import { Component, Input } from '@angular/core';
import accommodationData from './accommodation-sample-data.json';
import { Accommodation } from '../accommodation';
import { Address } from 'src/app/address';
import { Review } from '../review';

@Component({
  selector: 'app-accommodation-page',
  templateUrl: './accommodation-page.component.html',
  styleUrls: ['./accommodation-page.component.css']
})

export class AccommodationPageComponent {
  accommodation: Accommodation = accommodationData;

  backgroundImageUrl: string = accommodationData.photos[0];
  name: string = accommodationData.name;
  address: Address = accommodationData.address;
  minGuests: number = accommodationData.minGuests;
  maxGuests: number = accommodationData.maxGuests;
  roomNumber: number = accommodationData.roomNumber;
  description: string = accommodationData.description;
  numberOfReviews: number = accommodationData.reviews.length;
  averageGrade: number = accommodationData.averageGrade;
  get stars() {
    return Array(Math.floor(this.averageGrade)).fill(0);
  }
  hostName: string = "John Smith";
  amenities: string[] = accommodationData.amenities;
  reviews: Array<Review> = accommodationData.reviews;
}
