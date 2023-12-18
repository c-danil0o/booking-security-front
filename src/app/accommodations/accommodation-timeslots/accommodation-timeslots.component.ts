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
    occupied_timeslots: Timeslot[] = [];
    lastId: number = 0;
    isPricePerGuest: boolean;
    isAutoApproval: boolean;
    cancellationDeadline: number;
    form1Data: AccommodationForm1Model;
    hostId: number | undefined;
    accommodation: Accommodation;
    updating: boolean = false;

    constructor(private route: ActivatedRoute, private accommodationService: AccommodationService, private formsService: FormsService, private authService: AuthService, private hostService: HostService, private router: Router) {
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
                            // @ts-ignore
                            let numbers: number[] = this.accommodation.availability[i].startDate as number[];
                            let startDate: Date = new Date(numbers[0], numbers[1]-1, numbers[2], numbers[3], numbers[4]);
                            // @ts-ignore
                            numbers = this.accommodation.availability[i].endDate as number[];
                            let endDate: Date = new Date(numbers[0], numbers[1]-1, numbers[2], numbers[3], numbers[4]);
                            let timeslot: Timeslot = {
                                startDate: startDate,
                                endDate: endDate,
                                isOccupied: this.accommodation.availability[i].isOccupied,
                                price: this.accommodation.availability[i].price,
                            }
                            if (!this.accommodation.availability[i].isOccupied) {
                                this.timeslots.push(timeslot);
                            } else if (timeslot.endDate.valueOf() >= Date.now().valueOf()) {
                                this.occupied_timeslots.push(timeslot)
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
                if (this.updating) {
                    for (let i = 0; i < this.occupied_timeslots.length; i++) {
                        if (this.timeslots[i].startDate.valueOf() < this.endDate.valueOf() && this.timeslots[i].endDate.valueOf() > this.startDate.valueOf()) {
                            alert("Dates overlap with occupied timeslots!")
                            return
                        }
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

    remove(id:number) {
        this.timeslots = this.timeslots.filter((e, i) => e.id !== id);
    }

    send() {
        if (this.cancellationDeadline) {
            const hostEmail: string | null = this.authService.getEmail();
            if (hostEmail != null) {
                const email: Email = {
                    email: hostEmail
                }
                this.hostService.findByEmail(email).subscribe({
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
                            isApproved: false,
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

            }


        } else {
            alert("cancellation deadline required!")
        }

    }
}

