import {Component, Input} from '@angular/core';
import {Accommodation} from "../../model/accommodation-model";
import {AccommodationService} from "../accommodation.service";
import {PaginatorState} from "primeng/paginator";
import {ListboxChangeEvent, ListboxSelectAllChangeEvent} from "primeng/listbox";
import {SearchFormService} from "../../shared/search-form.service";
import {SearchModel} from "../../model/search-model";
import {CheckboxChangeEvent} from "primeng/checkbox";

@Component({
  selector: 'app-filtered-accommodations',
  templateUrl: './filtered-accommodations.component.html',
  styleUrls: ['./filtered-accommodations.component.css']
})
export class FilteredAccommodationsComponent {
  // @Input() props = {startDate: new Date(), endDate: new Date()};

  accommodations: Accommodation[];
  currentPage: number = 1;
  rows: number = 3;
  first: number = 0;
  totalItems: number = 0;
  searchForm: SearchModel;
  accommodationTypes: string[] = ["Room", "Apartment", "Hotel"]
  selectedTypes: string[] = [];
  amenities: string[] = ["TV", "Parking", "AC", "Fridge", "Lift", "Pet Friendly"];
  selected_amenities: string[] = [];


  constructor(private service: AccommodationService, private searchFormService: SearchFormService){
  }

  ngOnInit(): void{
    this.searchFormService.sharedForms$.subscribe({
      next: (data: SearchModel)=>{
        this.searchForm = data;
      }
    })
    this.service.searchAccommodations(this.searchForm).subscribe({
      next:(data: Accommodation[]) => {
        console.log(data);
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

  onCheckTypeChange($event: CheckboxChangeEvent, type: string) {
    if ($event.checked.length === 1) {
      this.selectedTypes.push(type)
    } else {
      const index = this.selectedTypes.indexOf(type, 0);
      if (index > -1) {
        this.selectedTypes.splice(index, 1);
      }
    }
    console.log(this.selectedTypes)

  }
  onCheckAmenityChange($event: CheckboxChangeEvent, amenity: string) {
    if ($event.checked.length === 1) {
      this.selected_amenities.push(amenity)
    } else {
      const index = this.selected_amenities.indexOf(amenity, 0);
      if (index > -1) {
        this.selected_amenities.splice(index, 1);
      }
    }
    console.log(this.selected_amenities)
  }
}
