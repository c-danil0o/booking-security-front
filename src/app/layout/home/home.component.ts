import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AccommodationService} from "../../accommodations/accommodation.service";
import {FormsService} from "../../shared/forms.service";
import {SearchFormService} from "../../shared/search-form.service";
import {SearchModel} from "../../model/search-model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  place: string;
  startDate: Date= new Date();
  endDate: Date = new Date();
  guests: number;
  // myProps = {startDate: this.startDate, endDate: this.endDate};

  constructor(private router: Router, private searchFormService: SearchFormService) {
  }


  next(){
    const model: SearchModel = {
      place:this.place,
      startDate:this.startDate,
      endDate:this.endDate,
      guests:this.guests
    }
    this.searchFormService.setForms(model);

  }
}
