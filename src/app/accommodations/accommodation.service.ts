import {Injectable} from "@angular/core";
import {Accommodation} from "../model/accommodation-model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../env/env";
import {A} from "@angular/cdk/keycodes";
import {HostProperty} from "../model/hostproperty-model";

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


}
