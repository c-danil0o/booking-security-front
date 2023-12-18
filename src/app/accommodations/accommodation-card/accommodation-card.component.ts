import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Accommodation} from "../../model/accommodation-model";
import {environment} from "../../../env/env";

@Component({
  selector: 'app-accommodation-card',
  templateUrl: './accommodation-card.component.html',
  styleUrls: ['./accommodation-card.component.css']
})
export class AccommodationCardComponent {
  @Input()
  accommodation: Accommodation;
  @Output()
  clicked: EventEmitter<Accommodation> = new EventEmitter<Accommodation>();

  onAccommodationClicked(): void{
    this.clicked.emit(this.accommodation)
    console.log(this.accommodation.photos)
  }

  getPhotoURI(): string{
    return environment.filesApi + this.accommodation.photos[0]
    //return this.accommodation.photos[0]
  }
}
