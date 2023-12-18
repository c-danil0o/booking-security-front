import { Component } from '@angular/core';
import {HostProperty} from "../../model/hostproperty-model";
import {ActivatedRoute} from "@angular/router";
import {AccommodationService} from "../accommodation.service";
import {Table} from "primeng/table";
import {Accommodation} from "../../model/accommodation-model";
import {Reservation} from "../../model/reservation-model";
import {AccommodationStatus} from "../../model/accommodation-status-model";

@Component({
  selector: 'app-approve-accommodations',
  templateUrl: './approve-accommodations.component.html',
  styleUrls: ['./approve-accommodations.component.css']
})
export class ApproveAccommodationsComponent {
  accommodations: HostProperty[];
  loading: boolean = true;

  constructor(private route: ActivatedRoute, private accommodationService: AccommodationService) {
  }

  clear(table: Table) {
    table.clear();
  }
  ngOnInit() {
    this.route.params.subscribe((params)=>{
      this.accommodationService.getUnapproved().subscribe({
        next: (data: HostProperty[]) =>{
          console.log(data);
          this.accommodations = data;
          this.loading = false;
        }
      })
    })
  }

  approve(id: number){
    const isConfirmed = window.confirm('Are you sure you want to approve this property?');
    if (isConfirmed) {
      this.accommodationService.approveAccommodation(id).subscribe(
        () => {
          console.log('Property approved successfully');
          alert('Property approved successfully');
          this.refresh();
        },
        (error) => {
          console.error('Failed to approve Property:', error);
          alert('Failed to approve Property');
        }
      );
    }
  }

  deny(id: number){
    const isConfirmed = window.confirm('Are you sure you want to deny this Property?');
    if (isConfirmed) {
      this.accommodationService.denyAccommodation(id).subscribe(
        () => {
          console.log('Property denied successfully');
          alert('Property denied successfully');
          this.refresh();
        },
        (error) => {
          console.error('Failed to deny Property:', error);
          alert('Failed to deny Property');
        }
      );
    }
  }

  refresh() {
    this.loading = true; // Optional: Set loading to true while fetching new data
    this.accommodationService.getUnapproved().subscribe({
      next: (data: HostProperty[]) => {
        this.accommodations = data;
        this.loading = false; // Optional: Set loading to false after data is fetched
      },
      error: (error) => {
        console.error('Failed to refresh reservations:', error);
        this.loading = false; // Optional: Set loading to false on error
      }
    });
  }


  protected readonly AccommodationStatus = AccommodationStatus;
}
