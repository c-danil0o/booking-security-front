import {Component, Input, OnInit, ViewChild} from '@angular/core';
import accommodationData from '../accommodation-data.json';
import {Accommodation} from '../../model/accommodation-model';
import {Address} from 'src/app/model/address-model';
import {Review} from '../../model/review-model';
import {ActivatedRoute} from "@angular/router";
import {AccommodationService} from "../accommodation.service";
import {ReviewService} from "../../reviews/review.service";
import {PhotoService} from "../../shared/photo.service";
import {Host} from "../../model/host-model";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {Timeslot} from "../../model/timeslot-model";
import { AuthService } from 'src/app/infrastructure/auth/auth.service';


interface Image{
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
  profilePictureUrl: "",
  password: ""
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
  images: Image[] = [];
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

  place: string;
  startDate: Date;
  endDate: Date;
  guests: number;
  totalPrice: number | undefined;
  pricePerNight: number | undefined;

  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute, private accommodationService: AccommodationService, private reviewService: ReviewService, private photoService: PhotoService, private authService: AuthService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = +params['accommodationId']
      this.accommodationService.findById(id).subscribe({
        next: (data: Accommodation) => {
          this.accommodation = data
          this.accommodationLoaded = true;
          for (let i =0; i<this.accommodation.photos.length; i++){
            this.photoService.getImage(this.accommodation.photos[i]).subscribe({
              next: value => {
                let objectURL = URL.createObjectURL(value);
                this.images.push({url: this.sanitizer.bypassSecurityTrustUrl(objectURL), thumbnail:""});
                if (this.images.length === this.accommodation.photos.length){
                  this.imagesAreLoaded = true
                }
              }
            })
          }
          

          if(this.isGuest) {
            // info about searched dates and guest number
            this.accommodationService.getSearchedAccommodationDetails().subscribe((details) => {
              console.log(JSON.stringify(details));
              if(details) {
                console.log("2 exists")
                this.totalPrice = details.totalPrice;
                this.pricePerNight = details.pricePerNight;
              }
            })

            // info about prices
            this.accommodationService.getFilteredAccommodationDetails().subscribe((details) => {
              console.log(JSON.stringify(details));
              if(details) {
                this.startDate = details.startDate;
                this.endDate = details.endDate;
                this.guests = details.guests;
              }
            })
          }

          
          this.hostName = this.accommodation.host.firstName +" "+  this.accommodation.host.lastName;
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
    //return this.accommodation.photos[0]
  }


  updatePrices() {
    // const today: number = Date.now();
    // if (this.startDate != null && this.endDate != null) {
    //   if (today.valueOf() > this.startDate.valueOf() || today.valueOf() > this.endDate.valueOf() || this.startDate.valueOf() >= this.endDate.valueOf()) {
    //     this.pricePerNight = undefined;
    //     this.totalPrice = undefined;
    //   } else {
    //     this.startDate.setHours(12,0);
    //     this.endDate.setHours(12,0);
    //     this.accommodation.pricePerGuest
    //     // this.searchForm ={
    //     //   place:this.place,
    //     //   startDate:this.startDate,
    //     //   endDate:this.endDate,
    //     //   guests:this.guests
    //     // };
    //     // this.service.searchAccommodations(this.searchForm).subscribe({
    //     //   next:(data: SearchedAccommodation[]) => {
    //     //     this.accommodations = data;
    //     //     this.filteredAccommodations=data;
    //     //     this.totalItems = data.length
    //     //     this.first = (this.currentPage -1 ) * this.rows
    //     //   },
    //     //   error: (_) => {console.log("error!")}
    //     // })
    //   }
    // }


    // const totalNights = this.calculateTotalNights();

  }
}
