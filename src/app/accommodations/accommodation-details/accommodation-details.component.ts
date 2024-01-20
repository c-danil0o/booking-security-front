import {Component, Input, OnInit, ViewChild} from '@angular/core';
import accommodationData from '../accommodation-data.json';
import {Accommodation} from '../../model/accommodation-model';
import {Address} from 'src/app/model/address-model';
import {Review} from '../../model/review-model';
import {ActivatedRoute, Router} from "@angular/router";
import {AccommodationService} from "../accommodation.service";
import {ReviewService} from "../../reviews/review.service";
import {PhotoService} from "../../shared/photo.service";
import {Host} from "../../model/host-model";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {Timeslot} from "../../model/timeslot-model";
import {AuthService} from 'src/app/infrastructure/auth/auth.service';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ReservationService} from 'src/app/reservations/reservation.service';
import {New_reservation} from 'src/app/model/new_reservation-model';
import {ReservationStatus} from 'src/app/model/ReservationStatus';
import {GuestService} from 'src/app/accounts/services/guest.service';
import {GetAvailabilityPrice} from 'src/app/model/get-availability-price-model';
import {GottenAvailabilityPrice} from 'src/app/model/gotten-availability-price-model';
import {error} from '@angular/compiler-cli/src/transformers/util';
import {MessageService} from "primeng/api";


interface Image {
  url: SafeUrl;
  thumbnail: string;
}

const emptyHost: Host = {
  firstName: "",
  lastName: "",
  phone: "",
  address: {
    street: "",
    city: "",
    number: "",
    country: "",
  },
  properties: [],
  hostReviews: [],
  id: undefined,
  email: "",
  isBlocked: false,
  profilePictureUrl: ""
};
const emptyAccommodation: Accommodation = {
  id: 0,
  name: "",
  description: "",
  amenities: [],
  maxGuests: 0,
  minGuests: 0,
  photos: [],
  pricePerGuest: false,
  cancellationDeadline: 0,
  autoApproval: false,
  averageGrade: 0,
  reviews: [],
  roomNumber: 0,
  address: {street: "", number: "", city: "", country: ""},
  host: emptyHost,
  availability: [],
  accommodationType: "",
  status: 0
}

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css']
})


export class AccommodationDetailsComponent implements OnInit {
  isGuest: boolean = this.authService.getRole() == "ROLE_Guest";
  accommodation: Accommodation = emptyAccommodation;
  hostName: string
  viewOnly: boolean = true;
  images: Image[] = [];
  isFavorite: boolean = false;
  imagesAreLoaded: boolean = false;
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];
  accommodationLoaded: boolean = false;
  reviewsLoaded: boolean = false;

  reservation_form: FormGroup;
  totalPrice: number;
  pricePerNight: number;
  minimumDate = new Date();
  disabledDates: Date[] = [];
  activeTimeslots: Timeslot[] = [];


  constructor(private sanitizer: DomSanitizer, private messageService: MessageService, private route: ActivatedRoute, private accommodationService: AccommodationService, private reviewService: ReviewService, private photoService: PhotoService, private authService: AuthService, private reservationService: ReservationService, private guestService: GuestService, private router: Router) {
  }

  ngOnInit() {
    console.log(this.accommodation.maxGuests + " " + this.accommodation.minGuests)
    this.reservation_form = new FormGroup({
      startDate: new FormControl('', [Validators.required, this.validateDateRange.bind(this)]),
      endDate: new FormControl('', [Validators.required, this.validateDateRange.bind(this)]),
      guests: new FormControl('', [Validators.required]),
    });

    this.route.params.subscribe((params) => {
      const id = +params['accommodationId']
      this.accommodationService.findById(id).subscribe({
        next: (data: Accommodation) => {
          this.accommodation = data
          this.accommodationLoaded = true;
          if (this.accommodation.host.id == this.authService.getId()) {
            this.viewOnly = false;
          }
          this.activeTimeslots = this.accommodation.availability;

          this.reservation_form.get('guests')?.setValidators([
            Validators.required,
            Validators.min(this.accommodation.minGuests),
            Validators.max(this.accommodation.maxGuests)
          ]);
          this.reservation_form.get('guests')?.updateValueAndValidity();

          for (let i = 0; i < this.accommodation.photos.length; i++) {
            this.photoService.getImage(this.accommodation.photos[i]).subscribe({
              next: value => {
                let objectURL = URL.createObjectURL(value);
                this.images.push({url: this.sanitizer.bypassSecurityTrustUrl(objectURL), thumbnail: ""});
                if (this.images.length === this.accommodation.photos.length) {
                  this.imagesAreLoaded = true
                }
              }
            })
          }

          if (this.isGuest) {
            this.guestService.checkFavorite(this.accommodation.id, this.authService.getId() || -1).subscribe((fav) => this.isFavorite = fav );
            // info about searched dates and guest number
            this.accommodationService.getSearchedAccommodationDetails().subscribe((searchDetails) => {
              if (searchDetails) {
                this.totalPrice = searchDetails.totalPrice;
                this.pricePerNight = searchDetails.pricePerNight;
              }
            })


            // info about prices
            this.accommodationService.getFilteredAccommodationDetails().subscribe((filterDetails) => {
              if (filterDetails) {
                this.reservation_form.patchValue({
                  startDate: filterDetails.startDate,
                  endDate: filterDetails.endDate,
                  guests: filterDetails.guests
                })
              }
            })
          }


          this.hostName = this.accommodation.host.firstName + " " + this.accommodation.host.lastName;
          this.reviewService.findByAccommodationId(this.accommodation.id).subscribe({
            next: (data: Review[]) => {
              this.accommodation.reviews = data
              this.reviewsLoaded = true;
            }
          })

        }
      })


    })

  }


  get stars() {
    return Array(Math.floor(this.accommodation.averageGrade)).fill(0);
  }

  getPhotoURI(): string[] {
    return this.accommodation.photos.map(element => '../../../../../assets/' + element)
  }


  validateDateRange(control: AbstractControl): { [key: string]: boolean } | null {
    const startDate = control.get('startDate')?.value;
    const endDate = control.get('endDate')?.value;

    if (startDate && endDate) {
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);

      const currentDate = new Date();

      // one in past
      if (startDateObj <= currentDate || endDateObj <= currentDate) {
        return {'invalidDateRange': true, 'pastDate': true};
      }

      // end after start
      if (endDateObj <= startDateObj) {
        return {'invalidDateRange': true, 'endDateBeforeStartDate': true};
      }
    }
    return null;
  }


  onSubmit(): void {
    const userId = this.authService.getId();
    if (userId !== null) {
      let {startDate, endDate, guests} = this.reservation_form.value;
      startDate = new Date(startDate + 'Z')
      endDate = new Date(endDate + 'Z')

      let days = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));
      console.log(JSON.stringify(startDate));
      console.log(JSON.stringify(endDate));
      const newReservation: New_reservation = {
        startDate,
        days: days,
        price: this.pricePerNight * days,
        reservationStatus: this.accommodation.autoApproval ? ReservationStatus.Approved : ReservationStatus.Pending,
        accommodationId: this.accommodation.id,
        guestId: userId,
        hostId: this.accommodation.host.id || -1,
        numberOfGuests: guests
      };
      console.log(this.pricePerNight + " " + this.totalPrice);
      // creating reservation
      this.reservationService.createReservation(newReservation).subscribe(
        (reservationData: any) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            key: 'bc',
            detail: 'Reservation created successfully!',
            life: 2000
          })
          this.router.navigate(['/guest-reservations', this.authService.getId()])
        },
        (error: any) => {
          console.error('Error creating reservation:', error);
        }
      );
    }
  }

  onCheck(submit: boolean): void {
    let {startDate, endDate, guests} = this.reservation_form.value;
    if (this.reservation_form.valid && startDate<endDate && guests>0 && guests>=this.accommodation.minGuests && guests<=this.accommodation.maxGuests) {
      startDate = new Date(startDate + 'Z')
      endDate = new Date(endDate + 'Z')

      let getAvailabilityPriceDetails: GetAvailabilityPrice = {
        accommodationId: this.accommodation.id,
        startDate: startDate,
        endDate: endDate,
        guests: guests
      }
      console.log("qm");

      this.accommodationService.checkAvailabilityAndPrice(getAvailabilityPriceDetails).subscribe(
        (gottenAvailabilityPrice: GottenAvailabilityPrice) => {
          const {available, pricePerNight, totalPrice} = gottenAvailabilityPrice;

          if (available) {
            this.updatePrices(pricePerNight, totalPrice);
            if (submit){
              this.onSubmit();
            }

          } else {
            this.messageService.add({
              severity: 'error',
              summary: 'Warning',
              key: 'bc',
              detail: 'Accommodation is not available for selected dates!',
              life: 2000
            })
          }
        },
        (error: any) => {
          console.error('Error checking availability and price: ' + error.message);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            key: 'bc',
            detail: 'Server error!',
            life: 2000
          })
        }
      );


    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        key: 'bc',
        detail: 'Reservation form is not valid!',
        life: 2000
      })
      // print all invalid fields in the console
      this.reservation_form.markAllAsTouched();
      for (const key of Object.keys(this.reservation_form.controls)) {
        if (this.reservation_form.controls[key].invalid)
          console.log(`${key}:`, this.reservation_form.controls[key].errors);
      }
    }
  }

  updatePrices(pricePerNight: number, totalPrice: number) {
    this.pricePerNight = pricePerNight;
    this.totalPrice = totalPrice;
  }

  reportAccommodationReview(id: number) {
    this.reviewService.reportReview(id).subscribe({
      next: (review) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          key: 'bc',
          detail: 'Review reported successfully!',
          life: 2000
        })
      },
      error: (err) => console.log(err)
    })
  }

  goToHostProfile(id: number | undefined) {
    this.router.navigate(['/host-profile', id])

  }

  addToFavorites(accommodationId: number) {
    this.guestService.addFavorite(accommodationId, this.authService.getId()||-1).subscribe({
      next: (review) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          key: 'bc',
          detail: 'Accommodation added to favorites!',
          life: 2000

    })
        this.isFavorite = true;

  }})}

  removeFavorite(id: number) {
    this.guestService.removeFavorite(id, this.authService.getId()||-1).subscribe({
      next: (review) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          key: 'bc',
          detail: 'Accommodation removed from favorites!',
          life: 2000

        })
        this.isFavorite = false;

      }})
  }
}
