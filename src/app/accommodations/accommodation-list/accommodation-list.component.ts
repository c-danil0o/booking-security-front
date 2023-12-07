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
  first: number = 0;
  totalItems: number = 0


  constructor(private service: AccommodationService){
  }

  ngOnInit(): void{
    this.service.getAll().subscribe({
      next:(data: Accommodation[]) => {
        this.accommodations = data;
        this.totalItems = data.length
        this.first = (this.currentPage -1 ) * this.rows
      },
      error: (_) => {console.log("error!")}
    })
  }
  search_text: string;
  items: any;
  selectedItems: any;
  selectAll: any;

  get paginatedAccommodations(): Array<Accommodation> {
    return this.accommodations.slice(this.first, this.first + this.rows
    );
  }


  onPageChange($event: PaginatorState) {
    if ($event.page != null) {
      this.currentPage = $event.page;
    }
    if ($event.rows != null) {
      this.rows = $event.rows
    }
    if ($event.first != null){
      this.first = $event.first
    }

  }

  onAccommodationClicked($event: Accommodation) {

  }

  onSelectAllChange($event: ListboxSelectAllChangeEvent) {

  }

  onChange($event: ListboxChangeEvent) {

  }
}


