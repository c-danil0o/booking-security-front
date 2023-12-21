import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  Output,
  ViewChild
} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {environment} from "../../../env/env";
import {GoogleMap, MapInfoWindow, MapMarker} from "@angular/google-maps";
import {Address} from "../../model/address-model";
import {GoogleAddressParser} from "./parser";
import MarkerOptions = google.maps.MarkerOptions;


@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements AfterViewInit{
  apiLoaded: Observable<boolean>;
  @ViewChild("search")
  public search: ElementRef
  @ViewChild(GoogleMap)
  public map!: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;
  @ViewChild(MapMarker) mapMarker: MapMarker;
  declare  google: any;
  options: google.maps.MapOptions = {
    center: {lat:45.2396, lng:19.8227},
    zoom: 13,
  };
  search_text: string;
  latitude!: any;
  longitude!: any;
  center!: google.maps.LatLngLiteral;
  markerOptions: MarkerOptions;
  markerInfoContent: string;
  @Output()
  address = new EventEmitter<Address>();
  newAddress: Address;
  @Input()
  addingAddress: boolean = false
  @Input()
  inputAddress: Address


  constructor(httpClient: HttpClient, private ngZone: NgZone, private changeDetector: ChangeDetectorRef) {
    // If you're using the `<map-heatmap-layer>` directive, you also have to include the `visualization` library
    // when loading the Google Maps API. To do so, you can add `&libraries=visualization` to the script URL:
    // https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization
    this.apiLoaded = httpClient.jsonp('https://maps.googleapis.com/maps/api/js?key='+ environment.googleMapsApi, 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }
  postData(){
    this.address.emit(this.newAddress)
  }
  ngAfterViewInit(): void {
    // Binding autocomplete to search input control
    if (this.addingAddress){
      let autocomplete = new google.maps.places.Autocomplete(
        this.search.nativeElement
      );
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          console.log(autocomplete.getPlace())

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          console.log({ place }, place.geometry.location?.lat());

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location?.lat();
          this.longitude = place.geometry.location?.lng();
          this.center = {
            lat: this.latitude,
            lng: this.longitude,
          };
          this.map.panTo(this.center);
          this.map.zoom = 20;
          if (place.formatted_address != null) {
            this.markerInfoContent = place.formatted_address;
          }

          this.markerOptions = {
            draggable: false,
            animation: google.maps.Animation.DROP,
          };
          this.openInfoWindow(this.mapMarker);
          if (place.address_components){
            this.newAddress = new GoogleAddressParser(place.address_components).result()
            this.newAddress.latitude = this.latitude
            this.newAddress.longitude = this.longitude
            this.postData()
          }



        });
      });
    }else{
      let center = {
        lat: this.inputAddress.latitude || 45,
        lng: this.inputAddress.longitude || 45,
      }
      this.map.panTo(center);
      this.center = center
      this.markerInfoContent = this.inputAddress.street + ', ' + this.inputAddress.number + ', ' + this.inputAddress.city
      this.openInfoWindow(this.mapMarker);
      this.changeDetector.detectChanges();
      this.map.zoom = 20;

      // this.markerOptions = {
      //   draggable: false,
      //   animation: google.maps.Animation.DROP,
      // };
    }

  }







openInfoWindow(marker: MapMarker) {
    // this is called when the marker is clicked.
    this.infoWindow.open(marker);
  }

}
