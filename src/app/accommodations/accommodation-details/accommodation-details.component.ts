import {Component, Input, OnInit} from '@angular/core';
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
  approved: false
}
@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css']
})



export class AccommodationDetailsComponent implements OnInit {
  accommodation: Accommodation = emptyAccommodation;
  hostName: string
  images: Image[] = [];
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

  constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute, private accommodationService: AccommodationService, private reviewService: ReviewService, private photoService: PhotoService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = +params['accommodationId']
      this.accommodationService.findById(id).subscribe({
        next: (data: Accommodation) => {
          this.accommodation = data
          for (let i =0; i<this.accommodation.photos.length; i++){
            this.photoService.getImage(this.accommodation.photos[i]).subscribe({
              next: value => {
                let objectURL = URL.createObjectURL(value);
                this.images.push({url: this.sanitizer.bypassSecurityTrustUrl(objectURL), thumbnail:""});
              }
            })
          }
          this.hostName = this.accommodation.host.firstName +" "+  this.accommodation.host.lastName;
          this.reviewService.findByAccommodationId(this.accommodation.id).subscribe({
            next: (data: Review[]) => {
              this.accommodation.reviews = data
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

}
