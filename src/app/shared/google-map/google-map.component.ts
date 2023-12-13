
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  NgZone,
  OnInit,
  Output,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {environment} from "../../../env/env";
import { Loader } from '@googlemaps/js-api-loader';
import {GoogleMap, MapInfoWindow, MapMarker} from "@angular/google-maps";
import {Address} from "../../model/address-model";
import {GoogleAddressParser} from "./parser";



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
  search_text: any;
  latitude!: any;
  longitude!: any;
  center!: google.maps.LatLngLiteral;
  markerOptions: any;
  markerInfoContent: any;
  @Output()
  address = new EventEmitter<Address>();
  newAddress: Address;

  constructor(httpClient: HttpClient, private ngZone: NgZone) {
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
    let autocomplete = new google.maps.places.Autocomplete(
      this.search.nativeElement
    );
    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        //get the place result
        let place: google.maps.places.PlaceResult = autocomplete.getPlace();

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
        this.markerInfoContent = place.formatted_address;

        this.markerOptions = {
          draggable: false,
          animation: google.maps.Animation.DROP,
        };
        this.openInfoWindow(this.mapMarker);
        if (place.address_components){
          this.newAddress = new GoogleAddressParser(place.address_components).result()
          this.postData()
        }



      });
    });
  }







openInfoWindow(marker: MapMarker) {
    // this is called when the marker is clicked.
    this.infoWindow.open(marker);
  }

}
