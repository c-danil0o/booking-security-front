import { Component } from '@angular/core';
import {HostProperty} from "../../model/hostproperty-model";
import {ActivatedRoute} from "@angular/router";
import {AccommodationService} from "../../accommodations/accommodation.service";
import {Table} from "primeng/table";
import {ReviewService} from "../review.service";
import {Review} from "../../model/review-model";

@Component({
  selector: 'app-approve-reviews',
  templateUrl: './approve-reviews.component.html',
  styleUrls: ['./approve-reviews.component.css']
})
export class ApproveReviewsComponent {
  reviews: Review[];
  loading: boolean = true;

  constructor(private route: ActivatedRoute, private reviewService: ReviewService) {
  }

  clear(table: Table) {
    table.clear();
  }
  ngOnInit() {
    this.route.params.subscribe((params)=>{
      this.reviewService.getUnapproved().subscribe({
        next: (data: Review[]) =>{
          console.log(data);
          this.reviews = data;
          this.loading = false;
        }
      })
    })
  }

  approve(id: number){
    const isConfirmed = window.confirm('Are you sure you want to approve this review?');
    if (isConfirmed) {
      this.reviewService.approveReview(id).subscribe(
        () => {
          console.log('Review approved successfully');
          this.refresh();
        },
        (error) => {
          console.error('Failed to approve review:', error);
        }
      );
    }
  }

  delete(id: number){
    const isConfirmed = window.confirm('Are you sure you want to delete this review?');
    if (isConfirmed) {
      this.reviewService.deleteReview(id).subscribe(
        () => {
          console.log('Review deleted successfully');
          this.refresh();
        },
        (error) => {
          console.error('Failed to delete review:', error);
        }
      );
    }
  }

  refresh() {
    this.loading = true; // Optional: Set loading to true while fetching new data
    this.reviewService.getUnapproved().subscribe({
      next: (data: Review[]) => {
        this.reviews = data;
        this.loading = false; // Optional: Set loading to false after data is fetched
      },
      error: (error) => {
        console.error('Failed to refresh reviews:', error);
        this.loading = false; // Optional: Set loading to false on error
      }
    });
  }

}
