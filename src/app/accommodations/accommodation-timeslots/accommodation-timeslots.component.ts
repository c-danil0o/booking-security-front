import {Component, OnInit} from '@angular/core';
import {Accommodation} from "../../model/accommodation-model";
import {Review} from "../../model/review-model";
import {ActivatedRoute, Router} from "@angular/router";
import {AccommodationService} from "../accommodation.service";
import {FormsService} from "../../shared/forms.service";
import {AccommodationForm1Model} from "../../model/accommodation-form1-model";
import {Timeslot} from "../../model/timeslot-model";
import {New_accommodation} from "../../model/new_accommodation-model";
import {HostService} from "../../accounts/services/host.service";
import {Email} from "../../model/Email";
import {Host} from "../../model/host-model";
import {convert} from "@js-joda/core";
import {MessageService} from "primeng/api";
import {KeycloakService} from "../../infrastructure/auth/keycloak.service";

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
  occupied_timeslots: Timeslot[] = [];
  lastId: number = 0;
  isPricePerGuest: boolean = false;
  isAutoApproval: boolean = false;
  cancellationDeadline: number;
  form1Data: AccommodationForm1Model;
  hostId: number | undefined;
  accommodation: Accommodation;
  updating: boolean = false;

  constructor(private route: ActivatedRoute, private accommodationService: AccommodationService, private formsService: FormsService, private keycloakService: KeycloakService, private hostService: HostService, private router: Router, private messagService: MessageService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = +params['accId']
      if (id === 0) {
        this.updating = false;
        this.formsService.sharedForms$.subscribe({
          next: (data: AccommodationForm1Model) => {
            this.form1Data = data;
          }
        })
        //second part of the form
      } else {
        this.updating = true;
        this.accommodationService.findById(id).subscribe({
          next: (data: Accommodation) => {
            this.accommodation = data;
            for (let i = 0; i < this.accommodation.availability.length; i++) {
              this.accommodation.availability[i].startDate = new Date(this.accommodation.availability[i].startDate+'Z')

              this.accommodation.availability[i].endDate = new Date(this.accommodation.availability[i].endDate + 'Z')
              if (!this.accommodation.availability[i].occupied) {
                this.timeslots.push(this.accommodation.availability[i]);
              } else if (this.accommodation.availability[i].endDate.valueOf() >= Date.now().valueOf()) {
                this.timeslots.push(this.accommodation.availability[i]);
                this.occupied_timeslots.push(this.accommodation.availability[i])
              }
            }
            this.cancellationDeadline = this.accommodation.cancellationDeadline;
            this.isAutoApproval = this.accommodation.autoApproval;
            this.isPricePerGuest = this.accommodation.pricePerGuest;
          }
        })
        //independent editing
      }


    })

  }

  update(): void {
    if (this.cancellationDeadline) {
      this.timeslots.forEach((timeslot) => timeslot.id = undefined)
      this.accommodation.availability = this.timeslots;
      this.accommodation.pricePerGuest = this.isPricePerGuest;
      this.accommodation.autoApproval = this.isAutoApproval;
      this.accommodation.cancellationDeadline = this.cancellationDeadline;
      this.accommodation.status = 1
      this.accommodationService.updateAccommodation(this.accommodation).subscribe({
        next: (data: Accommodation) => {
          console.log("updated accommodation: ", data)
          this.router.navigate(['/host-properties', this.accommodation.host.id]);
        },
        error: (_) => console.log("error updating accommodation")
      })
    }
  }


  add() {
    const today: number = Date.now()
    this.startDate = new Date(this.startDate + 'Z')
    this.endDate = new Date(this.endDate + 'Z')
    if (this.startDate != null && this.endDate != null && this.price != 0) {

      if (today.valueOf() >= this.startDate.valueOf() || today.valueOf() >= this.endDate.valueOf() || this.startDate.valueOf() >= this.endDate.valueOf()) {
        this.messagService.add({
          severity: 'error',
          summary: 'Error',
          key: 'bc',
          detail: 'Dates are not valid!',
          life: 2000
        })
      } else {
        if (this.updating) {
          for (let i = 0; i < this.occupied_timeslots.length; i++) {
            if (this.occupied_timeslots[i].startDate.valueOf() < this.endDate.valueOf() && this.occupied_timeslots[i].endDate.valueOf() > this.startDate.valueOf()) {
              this.messagService.add({
                severity: 'error',
                summary: 'Error',
                key: 'bc',
                detail: 'Dates overlap with occupied timeslots!',
                life: 2000
              })
              return
            }
          }
        }
        // verify and bind timeslots
        for (let i = 0; i < this.timeslots.length; i++) {
          if (this.timeslots[i].startDate.valueOf() < this.endDate.valueOf() && this.timeslots[i].endDate.valueOf() > this.startDate.valueOf()) {
            this.messagService.add({
              severity: 'error',
              summary: 'Error',
              key: 'bc',
              detail: 'Dates overlap with existing!',
              life: 2000
            })
            return
          }
          if (this.price == this.timeslots[i].price){
            if (this.startDate.valueOf() == this.timeslots[i].endDate.valueOf()){
              this.timeslots[i].endDate = this.endDate;
              return
            }
            if (this.endDate.valueOf() == this.timeslots[i].startDate.valueOf()){
              this.timeslots[i].startDate = this.startDate
              return
            }
          }
        }


        const timeslot: Timeslot = {
          id: this.lastId,
          startDate: this.startDate,
          endDate: this.endDate,
          price: this.price,
          occupied: false
        }
        this.lastId += 1;
        this.timeslots.push(timeslot)
        console.log(this.timeslots)

      }
    }
  }

  remove(id: number) {
    let ts = this.timeslots.find(ts => ts.id == id);
    if (ts?.occupied){
      this.messagService.add({
        severity: 'error',
        summary: 'Error',
        key: 'bc',
        detail: 'Cannot remove occupied timeslot!',
        life: 2000
      })
      return;
    }
    this.timeslots = this.timeslots.filter((e, i) => e.id !== id);
  }

  send() {
    if (this.cancellationDeadline) {
        this.hostService.findById(this.keycloakService.getId()).subscribe({
          next: (data: Host) => {
            this.hostId = data.id;
            this.timeslots.forEach((timeslot) => timeslot.id = undefined)
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
              status: 1,
              isAutoApproval: this.isAutoApproval,
              host: data
            }
            console.log(accommodation)
            this.accommodationService.createAccommodation(accommodation).subscribe({
              next: (data: New_accommodation) => {
                console.log("created new accommodation: ", data)
                this.router.navigate(['/host-properties', this.hostId]);
              },
              error: (_) => console.log("error creating accommodation")
            })
          },
          error: (_) => console.log("error getting host ")
        })



    } else {
      this.messagService.add({
        severity: 'error',
        summary: 'Error',
        key: 'bc',
        detail: 'Cancellation deadline required!',
        life: 2000
      });
    }

  }
}

