import { Component } from '@angular/core';
import {HostProperty} from "../../model/hostproperty-model";
import {ActivatedRoute} from "@angular/router";
import {AccommodationService} from "../../accommodations/accommodation.service";
import {Table} from "primeng/table";
import {ReviewService} from "../review.service";
import {Review} from "../../model/review-model";
import {MessageService, SelectItem} from "primeng/api";
import {ReviewStatus} from "../../model/review-status-model";

@Component({
  selector: 'app-approve-reviews',
  templateUrl: './approve-reviews.component.html',
  styleUrls: ['./approve-reviews.component.css']
})
export class ApproveReviewsComponent {
  reviews: Review[];
  filteredReviews: Review[];
  loading: boolean = true;
  statusOptions: SelectItem[] = [
    {label: 'All', value: null},
    {label: 'Approved', value: 'Approved'},
    {label: 'Pending', value: 'Pending'},
    {label: 'Reported', value: 'Reported'},
  ];
  selectedStatus: string;

  constructor(private route: ActivatedRoute, private reviewService: ReviewService, private messageService: MessageService) {
  }

  clear(table: Table) {
    table.clear();
  }
  ngOnInit() {
    this.route.params.subscribe((params)=>{
      this.reviewService.getAll().subscribe({
        next: (data: Review[]) =>{
          console.log(data);
          this.reviews = data;
          this.filteredReviews = data;
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
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            key: 'bc',
            detail: 'Review approved successfully!',
            life: 2000
          })
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
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            key: 'bc',
            detail: 'Review deleted successfully!',
            life: 2000
          })
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
    this.reviewService.getAll().subscribe({
      next: (data: Review[]) => {
        this.reviews = data;
        this.filteredReviews = data;
        this.loading = false; // Optional: Set loading to false after data is fetched
      },
      error: (error) => {
        console.error('Failed to refresh reviews:', error);
        this.loading = false; // Optional: Set loading to false on error
      }
    });
  }

  filterReviews(): void {
    if (!this.selectedStatus) {
      this.filteredReviews = this.reviews;
    } else {
      this.filteredReviews = this.reviews.filter(review => review.status.toString() == this.selectedStatus);
    }
  }

}
