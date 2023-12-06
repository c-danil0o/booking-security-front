import {Component, OnInit} from '@angular/core';
import accommodationData from '../accommodation-data.json';
import { Accommodation } from '../../model/accommodation-model';
import {AccommodationService} from "../accommodation.service";
import {PaginatorState} from "primeng/paginator";
import {ListboxChangeEvent, ListboxSelectAllChangeEvent} from "primeng/listbox";

@Component({
  selector: 'app-accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrls: ['./accommodation-list.component.css'],
})
export class AccommodationListComponent implements OnInit{
  accommodations: Accommodation[];
  currentPage: number = 1;
  rows: number = 3;
  totalItems: number = 0


  constructor(private service: AccommodationService){
  }

  ngOnInit(): void{
    this.service.getAll().subscribe({
      next:(data: Accommodation[]) => {
        this.accommodations = data;
      },
      error: (_) => {console.log("error!")}
    })
  }
  search_text: string;
  items: any;
  selectedItems: any;
  selectAll: any;
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.rows);
  }

  get paginatedAccommodations(): Array<Accommodation> {
    return this.accommodations.slice(
      (this.currentPage - 1) * this.rows,
      this.currentPage * this.rows
    );
  }

  changePage(page: number): void {
    this.currentPage = page;
  }

  isActive(pageNumber: number): boolean {
    return this.currentPage === pageNumber;
  }

  totalPagesArray(): number[] {
    return Array(this.totalPages)
      .fill(0)
      .map((_, index) => index + 1);
  }

  onPageChange($event: PaginatorState) {
    if ($event.page != null) {
      this.currentPage = $event.page;
    }
    if ($event.rows != null) {
      this.rows = $event.rows
    }

  }

  onAccommodationClicked($event: Accommodation) {

  }

  onSelectAllChange($event: ListboxSelectAllChangeEvent) {

  }

  onChange($event: ListboxChangeEvent) {

  }
}


