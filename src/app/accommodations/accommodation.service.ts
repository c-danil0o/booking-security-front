import { Injectable } from "@angular/core";
import { Accommodation } from "../model/accommodation-model";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "../../env/env";
import { A } from "@angular/cdk/keycodes";
import { HostProperty } from "../model/hostproperty-model";
import { New_accommodation } from "../model/new_accommodation-model";
import { SearchFormService } from "../shared/search-form.service";
import { SearchModel } from "../model/search-model";
import { SearchedAccommodation } from "../model/searched-accommodation-model";
import { Timeslot } from "../model/timeslot-model";
import { GetAvailabilityPrice } from "../model/get-availability-price-model";
import { GottenAvailabilityPrice } from "../model/gotten-availability-price-model";
import { AccommodationAnalysis } from "../model/accommodation-analysis-model";
import { AccommodationTotalEarnings } from "../model/accommodation-total-earnings-model";

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {
  private filteredAccommodationDetails = new BehaviorSubject<any>(null); // info when searched (dates and guests)
  private searchedAccommodationDetails = new BehaviorSubject<any>(null); // info about certain accommodation (totalPrice and pricePerGuest)

  constructor(private httpClient: HttpClient) {
  }

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });
  getAll(): Observable<Accommodation[]> {
    return this.httpClient.get<Accommodation[]>(environment.apiHost + 'api/accommodations/all')
  }

  getUnapproved(): Observable<HostProperty[]> {
    return this.httpClient.get<HostProperty[]>(environment.apiHost + 'api/accommodations/unapproved');
  }

  findById(id: number): Observable<Accommodation> {
    return this.httpClient.get<Accommodation>(environment.apiHost + 'api/accommodations/get/' + id)
  }

  findByHostId(id: number): Observable<HostProperty[]> {
    return this.httpClient.get<HostProperty[]>(environment.apiHost + 'api/accommodations/host/' + id)
  }

  getYearAnalytics(hostId: number, year: number): Observable<AccommodationAnalysis[]> {
    return this.httpClient.get<AccommodationAnalysis[]>(environment.apiHost + 'api/accommodations/yearAnalytics/' + hostId + '/' + year);
  }

  getPeriodAnalytics(hostId: number, startDate: Date, endDate: Date): Observable<AccommodationTotalEarnings[]> {
    startDate.setHours(12);             //pitaj danila
    endDate.setHours(12);
    const formattedStartDate = startDate.toISOString().split('T')[0];  // YYYY-MM-DD
    const formattedEndDate = endDate.toISOString().split('T')[0];
    const params = new HttpParams()
      .set('startDate', formattedStartDate)
      .set('endDate', formattedEndDate);

    return this.httpClient.get<AccommodationTotalEarnings[]>(environment.apiHost + 'api/accommodations/analytics/' + hostId, { params });
  }

  createAccommodation(accommodation: New_accommodation): Observable<New_accommodation> {
    return this.httpClient.post<any>(environment.apiHost + 'api/accommodations', accommodation);
  }

  searchAccommodations(searchModel: SearchModel): Observable<SearchedAccommodation[]> {
    return this.httpClient.post<SearchedAccommodation[]>(environment.apiHost + 'api/accommodations/search', searchModel);
  }

  updateAccommodation(accommodation: Accommodation): Observable<Accommodation> {
    return this.httpClient.put<Accommodation>(environment.apiHost + 'api/accommodations/update', accommodation);
  }

  approveAccommodation(id: number): Observable<Accommodation> {
    return this.httpClient.patch<Accommodation>(environment.apiHost + 'api/accommodations/' + id + '/approve', {});
  }

  denyAccommodation(id: number): Observable<Accommodation> {
    return this.httpClient.patch<Accommodation>(environment.apiHost + 'api/accommodations/' + id + '/deny', {});
  }

  setFilteredAccommodationDetails(details: any) {
    this.filteredAccommodationDetails.next(details);
  }

  getFilteredAccommodationDetails() {
    return this.filteredAccommodationDetails.asObservable();
  }

  setSearchedAccommodationDetails(details: any) {
    this.searchedAccommodationDetails.next(details);
  }

  getSearchedAccommodationDetails() {
    return this.searchedAccommodationDetails.asObservable();
  }

  checkAvailabilityAndPrice(getAvailabilityPrice: GetAvailabilityPrice): Observable<GottenAvailabilityPrice> {
    return this.httpClient.post<GottenAvailabilityPrice>(environment.apiHost + 'api/accommodations/get-availability-price', getAvailabilityPrice);
  }

  // ngOnInit() {
  //   this.route.params.subscribe((params)=>{
  //     const id = +params['hostId']
  //     this.accommodationService.findByHostId(id).subscribe({
  //       next: (data: HostProperty[]) =>{
  //         this.properties = data;
  //         this.loading = false;
  //       }
  //
  //     })
  //   })
  // }


}
