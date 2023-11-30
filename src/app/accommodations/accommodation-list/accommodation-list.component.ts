import { Component } from '@angular/core';
import accommodationData from '../accommodation-data.json';
import { Accommodation } from '../accommodation';

@Component({
  selector: 'app-accommodation-list',
  templateUrl: './accommodation-list.component.html',
  styleUrls: ['./accommodation-list.component.css'],
})
export class AccommodationListComponent {
  accommodations: Array<Accommodation> = accommodationData;

  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalItems: number = this.accommodations.length;

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get paginatedAccommodations(): Array<Accommodation> {
    return this.accommodations.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
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
}
