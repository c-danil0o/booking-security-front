import { Component } from '@angular/core';
import accommodationData from '../accommodation-data.json';
import { Accommodation } from '../accommodation';



@Component({
  selector: 'app-accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrls: ['./accommodation-list.component.css']
})
export class AccommodationListComponent {
  accommodations: Array<Accommodation> = accommodationData;
}
