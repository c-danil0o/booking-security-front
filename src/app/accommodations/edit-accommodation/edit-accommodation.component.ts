import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AccommodationService} from "../accommodation.service";
import {FormsService} from "../../shared/forms.service";
import {FileSendEvent, FileUploadErrorEvent, FileUploadEvent} from "primeng/fileupload";
import {Address} from "../../model/address-model";
import {CheckboxChangeEvent} from "primeng/checkbox";
import {Accommodation} from "../../model/accommodation-model";
import {PhotoService} from "../../shared/photo.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

interface Type {
  name: string;
}

interface Image {
  url: SafeUrl;
  name: string;
}

@Component({
  selector: 'app-edit-accommodation',
  templateUrl: './edit-accommodation.component.html',
  styleUrls: ['./edit-accommodation.component.css']
})
export class EditAccommodationComponent {
  types: Type[] = [{"name": "Apartment"}, {"name": "Room"}, {"name": "Hotel"}, {"name": "Villa"}]
  new_accommodation_form: FormGroup
  amenities: string[] = ["TV", "Parking", "AC", "Fridge", "Lift", "Pet Friendly"];
  selected_amenities: string[] = [];
  am: string = "";
  uploadedFiles: File[] = [];
  accommodation: Accommodation
  checked_amenities: boolean = true;
  images: Image[] = []
  lat: number;
  long: number;

  constructor(private sanitizer: DomSanitizer, private router: Router, private route: ActivatedRoute, private accommodationService: AccommodationService, private formsService: FormsService, private photoService: PhotoService) {
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

    this.route.params.subscribe((params) => {
      const id = +params['accId']
      this.accommodationService.findById(id).subscribe({
        next: (acc: Accommodation) => {
          this.accommodation = acc;
          if (this.accommodation.address.latitude != null) {
            this.lat = this.accommodation.address.latitude
          }
          if (this.accommodation.address.longitude != null) {
            this.long = this.accommodation.address.longitude
          }
          this.amenities = [...this.accommodation.amenities]
          this.selected_amenities = this.accommodation.amenities
          this.loadData(this.accommodation)
          for (let i = 0; i < this.accommodation.photos.length; i++) {
            this.photoService.getImage(this.accommodation.photos[i]).subscribe({
              next: value => {
                //this.uploadedFiles.push(new File([value], this.accommodation.photos[i]))
                let objectURL = URL.createObjectURL(value);
                this.images.push({
                  url: this.sanitizer.bypassSecurityTrustUrl(objectURL), name: this.accommodation.photos[i]
                });
              }
            })
          }

        }, error: (err) => console.log("error getting accommodation", err)
      })
    });

  }

  loadData(accommodation: Accommodation): void {
    this.new_accommodation_form.controls['name'].setValue(this.accommodation.name);
    this.new_accommodation_form.controls['selectedType'].setValue(this.types.find(typ => typ.name === this.accommodation.accommodationType));
    this.new_accommodation_form.controls['minGuests'].setValue(this.accommodation.minGuests);
    this.new_accommodation_form.controls['maxGuests'].setValue(this.accommodation.maxGuests);
    this.new_accommodation_form.controls['name'].setValue(this.accommodation.name);
    this.new_accommodation_form.controls['street'].setValue(this.accommodation.address.street);
    this.new_accommodation_form.controls['number'].setValue(this.accommodation.address.number);
    this.new_accommodation_form.controls['city'].setValue(this.accommodation.address.city);
    this.new_accommodation_form.controls['country'].setValue(this.accommodation.address.country);
    this.new_accommodation_form.controls['description'].setValue(this.accommodation.description);


  }

  addAmenity(amenity: string): void {
    this.amenities.push(amenity);
    this.selected_amenities.push(amenity);
    this.new_accommodation_form.get("")
    this.new_accommodation_form.get("newAmenity")?.reset();
  }


  onUpload($event: FileUploadEvent) {
    let file = $event.files[$event.files.length - 1]
    let objectURL = URL.createObjectURL(file);
    this.images.push({url: this.sanitizer.bypassSecurityTrustUrl(objectURL), name: file.name});
    console.log(this.images)

  }

  next() {
    if (this.new_accommodation_form.valid && this.new_accommodation_form.controls["minGuests"].value <= this.new_accommodation_form.controls["maxGuests"].value) {
      console.log('valid')
      this.accommodation.address = {
        country: this.new_accommodation_form.value.country,
        street: this.new_accommodation_form.value.street,
        number: this.new_accommodation_form.value.number,
        city: this.new_accommodation_form.value.city,
        latitude: this.lat,
        longitude: this.long
      }

      this.accommodation.name = this.new_accommodation_form.value.name
      this.accommodation.amenities = this.selected_amenities
      this.accommodation.description = this.new_accommodation_form.value.description
      this.accommodation.minGuests = this.new_accommodation_form.value.minGuests
      this.accommodation.maxGuests = this.new_accommodation_form.value.maxGuests
      this.accommodation.accommodationType = this.new_accommodation_form.value.selectedType.name
      this.accommodation.photos = this.images.map((file) => file.name)
      this.accommodation.status = 1
      this.accommodationService.updateAccommodation(this.accommodation).subscribe({
        next: (data: Accommodation) => {
          console.log("susccesfull update: ", data)
        },
        error: (err) => console.log(err)
      })

      this.router.navigate(['/host-properties', this.accommodation.host.id])

    } else {
      console.log("invalid")
      this.new_accommodation_form.markAllAsTouched();

      for (const key of Object.keys(this.new_accommodation_form.controls)) {
        if (this.new_accommodation_form.controls[key].value == null || this.new_accommodation_form.controls
          [key].value.length === 0 || this.new_accommodation_form.controls
          [key].value === 0) {
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
    if ($event.latitude != null) {
      this.lat = $event.latitude
    }
    if ($event.longitude != null) {
      this.long = $event.longitude
    }

  }


  onCheckChange($event: CheckboxChangeEvent, amenity: string) {
    console.log($event, amenity)
    if ($event.checked) {
      this.selected_amenities.push(amenity)
    } else {
      const index = this.selected_amenities.indexOf(amenity, 0);
      if (index > -1) {
        this.selected_amenities.splice(index, 1);
      }
    }
    console.log(this.selected_amenities)


  }

  removeImage(name: string) {
    /*  const index1 = this.uploadedFiles.find(file=> file.name === name)
      if (index1) {
        this.uploadedFiles.splice(this.uploadedFiles.indexOf(index1), 1)
      }*/
    const index2 = this.images.find(image => image.name === name)
    if (index2) {
      this.images.splice(this.images.indexOf(index2), 1);
    }
    console.log(this.images)
  }

  onError($event: FileUploadErrorEvent) {
    console.log($event)

  }

  onSend($event: FileSendEvent) {
    console.log($event)
  }
}
