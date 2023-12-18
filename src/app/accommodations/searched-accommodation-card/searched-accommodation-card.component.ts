import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Accommodation} from "../../model/accommodation-model";
import {SearchedAccommodation} from "../../model/searched-accommodation-model";

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

  onAccommodationClicked(): void{
    this.clicked.emit(this.accommodation)
    console.log(this.accommodation.photos)
  }

  getPhotoURI(): string[]{
    return this.accommodation.photos.map(element => '../../../../../assets/' + element)
    //return this.accommodation.photos[0]
  }
}
