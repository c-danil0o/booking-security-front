import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AccommodationService} from "../accommodation.service";
import {FileUploadEvent} from "primeng/fileupload";
interface Type{
  name: string;
}
@Component({
  selector: 'app-new-accommodation',
  templateUrl: './new-accommodation.component.html',
  styleUrls: ['./new-accommodation.component.css']
})

export class NewAccommodationComponent implements OnInit{
  types: Type[] = [{"name": "Apartment"}, {"name": "Room"}, {"name": "Hotel"}, {"name": "Villa"}]
  new_accommodation_form: FormGroup
  amenities: string[] = ["TV", "Parking", "AC", "Fridge", "Lift", "Pet Friendly"];
  selected_amenities: string[];
  am: string = "";
  uploadedFiles: any;
  constructor(private router: Router, private accommodationService: AccommodationService ) {
  }
  ngOnInit() {
    this.new_accommodation_form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      selectedType: new FormControl('', [Validators.required]),
      selected_amenities: new FormControl([]),
      newAmenity: new FormControl(''),

    }, [])
  }

  addAmenity(amenity: string): void{
    this.amenities.push(amenity);
    this.new_accommodation_form.get("")
    this.new_accommodation_form.get("newAmenity")?.reset();
  }


  onUpload($event: FileUploadEvent) {
    
  }
}
