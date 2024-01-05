import {Component, OnInit} from '@angular/core';
import {Reservation} from "../../model/reservation-model";
import {ActivatedRoute} from "@angular/router";
import {ReservationService} from "../reservation.service";
import {Table} from "primeng/table";
import {SelectItem} from "primeng/api";
import {Report} from "../../model/report-model";
import {ReportService} from "../../reports/report.service";

@Component({
  selector: 'app-host-reservations',
  templateUrl: './host-reservations.component.html',
  styleUrls: ['./host-reservations.component.css']
})
export class HostReservationsComponent implements OnInit {
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
    {label: 'Canceled', value: 'Canceled'},
    // Add more status options as needed
  ];
  hostId: number;
  guestReportVisible: boolean = false;
  reportReason: string;

  constructor(private route: ActivatedRoute, private reservationService: ReservationService, private reportService: ReportService) {
  }

  clear(table: Table) {
    table.clear();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const hostId = +params["hostId"];
      this.hostId = hostId;
      console.log(hostId)
      this.reservationService.getByHostId(hostId).subscribe({
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

  acceptReservation(id: number) {
    const isConfirmed = window.confirm('Are you sure you want to approve this reservation?');
    if (isConfirmed) {
      this.reservationService.approveReservation(id).subscribe(
        () => {
          console.log('Reservation approved successfully');
          alert('Reservation approved successfully');
          this.refresh();
        },
        (error) => {
          console.error('Failed to approve reservation:', error);
          alert('Failed to approve reservation');
        }
      );
    }
  }

  declineReservation(id: number) {
    const isConfirmed = window.confirm('Are you sure you want to deny this reservation?');
    if (isConfirmed) {
      this.reservationService.denyReservation(id).subscribe(
        () => {
          console.log('Reservation denied successfully');
          alert('Reservation denied successfully');
          this.refresh();
          // You can perform additional actions after approval if needed
        },
        (error) => {
          console.error('Failed to deny reservation:', error);
          alert('Failed to deny reservation');
        });
    }

  }

  refresh() {
    this.loading = true; // Optional: Set loading to true while fetching new data
    this.reservationService.getByHostId(this.hostId).subscribe({
      next: (data: Reservation[]) => {
        data.forEach((reservation) => {
          reservation.startDate = new Date(reservation.startDate)
          reservation.endDate = new Date(reservation.endDate)
        })
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

  checkIfInPast(res: Reservation): boolean{
    return res.startDate.valueOf() < Date.now().valueOf();
  }

  showGuestReporting(){
    this.guestReportVisible = true;
  }

  addGuestReport(guestId: number){
    if (this.reportReason=="")
      return;
    let report: Report = {
      id: -1,
      reason: this.reportReason,
      authorId: this.hostId,
      reportedUserId: guestId,
      date: new Date()
    }
    this.reportService.saveNewReport(report).subscribe({
      next: (report) => console.log(report),
      error: (err) => console.log(err)
    })
    this.guestReportVisible = false;
    this.reportReason= "";
  }

}

