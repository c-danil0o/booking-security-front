import {Injectable} from "@angular/core";
import {Accommodation} from "../model/accommodation-model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../env/env";
import {A} from "@angular/cdk/keycodes";
import {HostProperty} from "../model/hostproperty-model";
import {New_accommodation} from "../model/new_accommodation-model";

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {
  private accommodationList: Accommodation[] = [];


  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Accommodation[]> {
    return this.httpClient.get<Accommodation[]>(environment.apiHost + 'api/accommodations/all')
  }

  findById(id: number): Observable<Accommodation> {
    return this.httpClient.get<Accommodation>(environment.apiHost + 'api/accommodations/' + id)
  }

  findByHostId(id: number): Observable<HostProperty[]> {
    return this.httpClient.get<HostProperty[]>(environment.apiHost + 'api/accommodations/host/' + id)
  }

  createAccommodation(accommodation: New_accommodation):Observable<New_accommodation>{
    return this.httpClient.post<any>(environment.apiHost + 'api/accommodations', accommodation);
  }

  updateAccommodation(accommodation: Accommodation):Observable<Accommodation>{
    return this.httpClient.put<Accommodation>(environment.apiHost + 'api/accommodations/update', accommodation);
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
