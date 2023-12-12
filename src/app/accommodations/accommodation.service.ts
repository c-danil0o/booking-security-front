import {Injectable} from "@angular/core";
import {Accommodation} from "../model/accommodation-model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../env/env";
import {A} from "@angular/cdk/keycodes";

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
