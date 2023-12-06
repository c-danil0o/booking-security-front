import { Component, Input } from '@angular/core';
import accommodationData from '../accommodation-data.json';
import { Accommodation } from '../../model/accommodation-model';
import { Address } from 'src/app/model/address-model';
import { Review } from '../../model/review-model';

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css']
})

export class AccommodationDetailsComponent {
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
