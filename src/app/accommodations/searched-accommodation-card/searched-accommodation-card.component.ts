import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Accommodation} from "../../model/accommodation-model";
import {SearchedAccommodation} from "../../model/searched-accommodation-model";
import { AccommodationService } from '../accommodation.service';
import { Router } from '@angular/router';
import {environment} from "../../../env/env";

@Component({
  selector: 'app-searched-accommodation-card',
  templateUrl: './searched-accommodation-card.component.html',
  styleUrls: ['./searched-accommodation-card.component.css']
})
export class SearchedAccommodationCardComponent {
  @Input()
  accommodation: SearchedAccommodation;
  @Output()
  clicked: EventEmitter<SearchedAccommodation> = new EventEmitter<SearchedAccommodation>();
  constructor(private accommodationService: AccommodationService, private router: Router) {}  

  onAccommodationClicked(): void{

    this.clicked.emit(this.accommodation)
    console.log(this.accommodation.photos)
  }

  onAccommodationDetailsClick(): void {
    const priceDetails = {
      totalPrice: this.accommodation.price,
      pricePerNight: this.accommodation.pricePerNight,
    }
    this.accommodationService.setSearchedAccommodationDetails(priceDetails)
    // console.log(JSON.stringify(this.accommodationService.getFilteredAccommodationDetails()));
    this.router.navigate(['/accommodation-details', this.accommodation.id]);
  }

  getPhotoURI(): string{
    return environment.filesApi + this.accommodation.photos[0]

    //return this.accommodation.photos[0]
  }
}
