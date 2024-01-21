import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AccommodationService} from "../../accommodations/accommodation.service";
import {FormsService} from "../../shared/forms.service";
import {SearchFormService} from "../../shared/search-form.service";
import {SearchModel} from "../../model/search-model";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  place: string;
  startDate: Date;
  endDate: Date;
  guests: number;

  constructor(private router: Router, private searchFormService: SearchFormService, private messageService: MessageService) {
  }


  next() {
    const today: number = Date.now()
    if (this.startDate != null && this.endDate != null && this.place != '') {
      if (today.valueOf() > this.startDate.valueOf() || today.valueOf() > this.endDate.valueOf() || this.startDate.valueOf() >= this.endDate.valueOf()) {
        this.messageService.add({
          severity: 'error',
          summary: 'Warning',
          key: 'bc',
          detail: 'Invalid dates!',
          life: 2000
        })
      } else {
        this.startDate.setHours(12, 0);
        this.endDate.setHours(12, 0);
        const model: SearchModel = {
          place: this.place,
          startDate: this.startDate,
          endDate: this.endDate,
          guests: this.guests
        }
        this.searchFormService.setForms(model);
        this.router.navigate(['/filtered-accommodations']);
      }
    }else{
      this.messageService.add({
        severity: 'error',
        summary: 'Warning',
        key: 'bc',
        detail: 'Location and date range fields are required!',
        life: 2000
      })
    }


  }
}
