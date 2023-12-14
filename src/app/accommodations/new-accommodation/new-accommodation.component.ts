import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AccommodationService} from "../accommodation.service";
import {FileProgressEvent, FileUploadEvent, FileUploadHandlerEvent} from "primeng/fileupload";
import {Address} from "../../model/address-model";
import {Accommodation} from "../../model/accommodation-model";
import {AccommodationForm1Model} from "../../model/accommodation-form1-model";
import {FormsService} from "../../shared/forms.service";
import {CheckboxChangeEvent} from "primeng/checkbox";
import {UploadService} from "../../shared/upload.service";

interface Type {
  name: string;
}

@Component({
  selector: 'app-new-accommodation',
  templateUrl: './new-accommodation.component.html',
  styleUrls: ['./new-accommodation.component.css']
})

export class NewAccommodationComponent implements OnInit {
  types: Type[] = [{"name": "Apartment"}, {"name": "Room"}, {"name": "Hotel"}, {"name": "Villa"}]
  new_accommodation_form: FormGroup
  amenities: string[] = ["TV", "Parking", "AC", "Fridge", "Lift", "Pet Friendly"];
  selected_amenities: string[] = [];
  am: string = "";
  uploadedFiles: File[] = [];
  search_text: string = "";
  progress: number = 0;
  upload_done: boolean = false;

  constructor(private fileUpload: UploadService, private router: Router, private accommodationService: AccommodationService, private formsService: FormsService) {
  }

  ngOnInit() {
    this.new_accommodation_form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      selectedType: new FormControl('', [Validators.required]),
      newAmenity: new FormControl(''),
      minGuests: new FormControl(0, [Validators.required, Validators.min(1)]),
      maxGuests: new FormControl(0, [Validators.required, Validators.max(20), Validators.min(1)]),
      country: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      number: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),

    }, [])

  }

  addAmenity(amenity: string): void {
    this.amenities.push(amenity);
    this.new_accommodation_form.get("")
    this.new_accommodation_form.get("newAmenity")?.reset();
  }


  onUpload($event: FileUploadHandlerEvent) {
    this.uploadedFiles = $event.files
    this.upload_done = true

  }

  next() {
    if (this.new_accommodation_form.valid && this.new_accommodation_form.controls["minGuests"].value <= this.new_accommodation_form.controls["maxGuests"].value) {
      console.log('valid')
      const address: Address = {
        country: this.new_accommodation_form.value.country,
        street: this.new_accommodation_form.value.street,
        number: this.new_accommodation_form.value.number,
        city: this.new_accommodation_form.value.city,
      }
      const model: AccommodationForm1Model = {
        address: address,
        name: this.new_accommodation_form.value.name,
        amenities: this.selected_amenities,
        description: this.new_accommodation_form.value.description,
        files: this.new_accommodation_form.value.files,
        minGuests: this.new_accommodation_form.value.minGuests,
        maxGuests: this.new_accommodation_form.value.maxGuests,
        accommodationType: this.new_accommodation_form.value.selectedType.name,
        photos: this.uploadedFiles.map((file)=> file.name)
      }
      this.formsService.setForms(model);
      console.log('first', model)
      this.router.navigate(['/accommodation-timeslots', 0]);

    } else {
      console.log("invalid")
      this.new_accommodation_form.markAllAsTouched();
      for (const key of Object.keys(this.new_accommodation_form.controls)) {
        if (this.new_accommodation_form.controls[key].value == null || this.new_accommodation_form.controls[key].value.length === 0 || this.new_accommodation_form.controls[key].value === 0) {
          this.new_accommodation_form.controls[key].markAsDirty();
        }
      }
    }
  }

  GetData($event: Address) {
    console.log($event);
    this.new_accommodation_form.controls['street'].setValue($event.street);
    this.new_accommodation_form.controls['number'].setValue($event.number);
    this.new_accommodation_form.controls['city'].setValue($event.city);
    this.new_accommodation_form.controls['country'].setValue($event.country);

  }


  onCheckChange($event: CheckboxChangeEvent, amenity: string) {
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

  onProgress($event: FileProgressEvent) {
      this.progress = $event.progress;
  }
}
