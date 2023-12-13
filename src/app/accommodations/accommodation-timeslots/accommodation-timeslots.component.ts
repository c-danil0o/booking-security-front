import {Component, OnInit} from '@angular/core';
import {Accommodation} from "../../model/accommodation-model";
import {Review} from "../../model/review-model";
import {ActivatedRoute, Router} from "@angular/router";
import {AccommodationService} from "../accommodation.service";
import {FormsService} from "../../shared/forms.service";
import {AccommodationForm1Model} from "../../model/accommodation-form1-model";
import {Timeslot} from "../../model/timeslot-model";
import {New_accommodation} from "../../model/new_accommodation-model";
import {AuthService} from "../../infrastructure/auth/auth.service";
import {HostService} from "../../accounts/services/host.service";
import {Email} from "../../model/Email";
import {Host} from "../../model/host-model";

@Component({
  selector: 'app-accommodation-timeslots',
  templateUrl: './accommodation-timeslots.component.html',
  styleUrls: ['./accommodation-timeslots.component.css']
})
export class AccommodationTimeslotsComponent implements OnInit {
  startDate: Date;
  endDate: Date;
  price: number = 0;
  timeslots: Timeslot[] = [];
  lastId: number = 0;
  isPricePerGuest: boolean;
  isAutoApproval: boolean;
  cancellationDeadline: number;
  form1Data: AccommodationForm1Model;
  hostId: number | undefined;

  constructor(private route: ActivatedRoute, private accommodationService: AccommodationService, private formsService: FormsService, private authService: AuthService, private hostService: HostService, private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = +params['accId']
      if (id === 0) {
        this.formsService.sharedForms$.subscribe({
          next: (data: AccommodationForm1Model) => {
            this.form1Data = data;
          }
        })
        //second part of the form
      } else {
        //independent editing
      }


    })

  }

  add() {
    const today: number = Date.now()
    if (this.startDate != null && this.endDate != null && this.price != 0) {
      if (today.valueOf() > this.startDate.valueOf() || today.valueOf() > this.endDate.valueOf() || this.startDate.valueOf() >= this.endDate.valueOf()) {
        alert("Invalid dates!");
      } else {
        for (let i = 0; i < this.timeslots.length; i++) {
          if (this.timeslots[i].startDate.valueOf() < this.endDate.valueOf() && this.timeslots[i].endDate.valueOf() > this.startDate.valueOf()) {
            alert("Dates overlap with existing!")
            return
          }
        }
        const timeslot: Timeslot = {
          id: this.lastId,
          startDate: this.startDate,
          endDate: this.endDate,
          price: this.price,
          isOccupied: false
        }
        this.lastId += 1;
        this.timeslots.push(timeslot)

      }
    }
  }

  remove(id: number) {
    this.timeslots = this.timeslots.filter((e, i) => e.id !== id);

  }

  send() {
    if (this.cancellationDeadline) {
      const hostEmail: string|null = this.authService.getEmail();
      if (hostEmail != null){
        const email: Email = {
          email: hostEmail
        }
        this.hostService.findByEmail(email).subscribe({
          next: (data: Host)=>{
            this.hostId = data.id;
            this.timeslots.forEach((timeslot)=> timeslot.id=undefined)
            const accommodation: New_accommodation = {
              name: this.form1Data.name,
              description: this.form1Data.description,
              address: this.form1Data.address,
              accommodationType: this.form1Data.accommodationType,
              amenities: this.form1Data.amenities,
              maxGuests: this.form1Data.maxGuests,
              minGuests: this.form1Data.minGuests,
              photos: this.form1Data.photos,
              isPricePerGuest: this.isPricePerGuest,
              cancellationDeadline: this.cancellationDeadline,
              availability: this.timeslots,
              isApproved: false,
              isAutoApproval: this.isAutoApproval,
              host: data
            }
            console.log(accommodation)
            this.accommodationService.createAccommodation(accommodation).subscribe({
              next: (data: New_accommodation) =>{
                console.log("created new accommodation: ", data)
                this.router.navigate(['/host-properties', this.hostId]);
              },
              error: (_) => console.log("error creating accommodation")
            })
          },
          error: (_)=> console.log("error getting host ")
        })

        }


    } else {
      alert("cancellation deadline required!")
    }

  }
}
