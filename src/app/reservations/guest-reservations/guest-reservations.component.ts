import {Component, OnInit} from '@angular/core';
import {Reservation} from "../../model/reservation-model";
import {MessageService, SelectItem} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {ReservationService} from "../reservation.service";
import {Table} from "primeng/table";
import {ReviewService} from "../../reviews/review.service";
import {Review} from "../../model/review-model";
import {ReviewStatus} from "../../model/review-status-model";

@Component({
  selector: 'app-guest-reservations',
  templateUrl: './guest-reservations.component.html',
  styleUrls: ['./guest-reservations.component.css']
})
export class GuestReservationsComponent implements OnInit {
  reservations: Reservation[];
  loading: boolean = true;
  filteredReservations: Reservation[];
  selectedStatus: string = '';
  statusOptions: SelectItem[] = [
    {label: 'All', value: null},
    {label: 'Approved', value: 'Approved'},
    {label: 'Pending', value: 'Pending'},
    {label: 'Denied', value: 'Denied'},
    {label: 'Active', value: 'Active'},
    {label: 'Done', value: 'Done'},
    {label: 'Cancelled', value: 'Cancelled'},
  ];
  guestId: number;
  accommodationReviewVisible: boolean = false;
  hostReviewVisible: boolean = false;
  accommodationReview: string;
  accommodation_rating_value: number = -1;
  host_rating_value: number = -1;
  hostReview: string;
  reviewTooltip: string;

  constructor(private route: ActivatedRoute, private reservationService: ReservationService, private router: Router, private reviewService: ReviewService, private messageService: MessageService) {
  }

  clear(table: Table) {
    table.clear();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const guestId = +params["guestId"];
      this.guestId = guestId
      this.reservationService.getByGuestId(guestId).subscribe({
        next: (data: Reservation[]) => {
          data.forEach((reservation) => {
            reservation.startDate = new Date(reservation.startDate)
            reservation.endDate = new Date(reservation.endDate)
          })
          this.reservations = data;
          this.filteredReservations = data;
          this.loading = false;
        }
      })
    })
  }

  cancelReservation(id: number) {
    const isConfirmed = window.confirm('Are you sure you want to cancel this reservation?');
    if (isConfirmed) {
      this.reservationService.cancelReservation(id).subscribe(
        () => {
          console.log('Reservation canceled successfully');
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            key: 'bc',
            detail: 'Reservation cancelled successfully!',
            life: 2000
          })
          this.refresh();
          // You can perform additional actions after approval if needed
        },
        (error) => {
          console.error('Failed to cancel reservation:', error);
          // alert('Failed to cancel reservation');
        });
    }

  }

  refresh() {
    this.loading = true; // Optional: Set loading to true while fetching new data
    this.reservationService.getByGuestId(this.guestId).subscribe({
      next: (data: Reservation[]) => {
        /*data.forEach((reservation)=>{
          // @ts-ignore
          let numbers: number[] = reservation.startDate as number[];
          reservation.startDate=new Date(numbers[0],numbers[1],numbers[2], numbers[3], numbers[4]);
          // @ts-ignore
          numbers = reservation.endDate as number[];
          reservation.endDate=new Date(numbers[0],numbers[1],numbers[2], numbers[3], numbers[4]);
        })*/
        this.reservations = data;
        this.filteredReservations = data;
        this.loading = false; // Optional: Set loading to false after data is fetched
      },
      error: (error) => {
        console.error('Failed to refresh reservations:', error);
        this.loading = false; // Optional: Set loading to false on error
      }
    });
  }

  filterReservations(): void {
    if (!this.selectedStatus) {
      this.filteredReservations = this.reservations;
    } else {
      this.filteredReservations = this.reservations.filter(reservation => reservation.reservationStatus.toString() == this.selectedStatus);
    }
  }

  goToHostProfile(hostId: number) {
    this.router.navigate(['/host-profile', hostId, true])
  }

  goToAccommodation(accommodationId: number) {
    this.router.navigate(['/accommodation-details', accommodationId])

  }

  addAccommodationReview(accommodationId: number) {
    if (this.accommodationReview == "" || this.accommodation_rating_value == -1) {
      return;
    }
    let review: Review = {
      id: -1,
      grade: this.accommodation_rating_value,
      comment: this.accommodationReview,
      status: ReviewStatus.Pending,
      date: new Date(),
      author: {
        accountId: this.guestId,
      },
      accommodationId: accommodationId
    }
    this.reviewService.saveNewReview(review).subscribe({
      next: (_) => this.messageService.add({
        severity: 'success',
        summary: 'Success',
        key: 'bc',
        detail: 'Review added successfully!',
        life: 2000
      }),
      error: (err) => console.log(err)
    })
    this.accommodationReviewVisible = false;
    this.accommodationReview = ""
    this.accommodation_rating_value = -1
  }

  addHostReview(hostId: number) {
    if (this.hostReview == "" || this.host_rating_value == -1) {
      return;
    }
    let review: Review = {
      id: -1,
      grade: this.host_rating_value,
      comment: this.hostReview,
      status: ReviewStatus.Approved,
      date: new Date(),
      author: {
        accountId: this.guestId,
      },
      hostId: hostId
    }
    this.reviewService.saveNewReview(review).subscribe({
      next: (_) => this.messageService.add({
        severity: 'success',
        summary: 'Success',
        key: 'bc',
        detail: 'Review added successfully!',
        life: 2000
      }),
      error: (err) => console.log(err)
    })
    this.hostReviewVisible = false;
    this.hostReview = ""
    this.host_rating_value = -1
  }

  showAccommodationModal() {
    this.accommodationReviewVisible = true;
  }

  showHostModal() {
    this.hostReviewVisible = true;

  }

  sevenDaysPassed(endDate: Date): boolean {
    if (endDate.valueOf() + 604800000 < new Date().valueOf()) {
      this.reviewTooltip = "7 days passed after reservation!"
      return true;
    }
    return false;
  }

  removeAccommodationReview(accommodationId: any) {
    this.reviewService.deleteAccommodationReview(accommodationId, this.guestId).subscribe({
      next: (_) => this.messageService.add({
        severity: 'success',
        summary: 'Success',
        key: 'bc',
        detail: 'Review removed successfully!',
        life: 2000
      })
    });
  }

  removeHostReview(hostId: any) {
    this.reviewService.deleteHostReview(hostId, this.guestId).subscribe({
      next: (_) => this.messageService.add({
        severity: 'success',
        summary: 'Success',
        key: 'bc',
        detail: 'Review removed successfully!',
        life: 2000
      })
    });

  }
}
