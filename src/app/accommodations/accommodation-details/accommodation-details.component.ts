import {Component, Input, OnInit} from '@angular/core';
import accommodationData from '../accommodation-data.json';
import {Accommodation} from '../../model/accommodation-model';
import {Address} from 'src/app/model/address-model';
import {Review} from '../../model/review-model';
import {ActivatedRoute} from "@angular/router";
import {AccommodationService} from "../accommodation.service";
import {ReviewService} from "../../reviews/review.service";

@Component({
  selector: 'app-accommodation-details',
  templateUrl: './accommodation-details.component.html',
  styleUrls: ['./accommodation-details.component.css']
})

export class AccommodationDetailsComponent implements OnInit {
  accommodation: Accommodation
  hostName: string

  constructor(private route: ActivatedRoute, private accommodationService: AccommodationService, private reviewService: ReviewService) {
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = +params['accommodationId']
      this.accommodationService.findById(id).subscribe({
        next: (data: Accommodation) => {
          this.accommodation = data
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
