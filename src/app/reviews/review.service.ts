import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../env/env";
import {Review} from "../model/review-model";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private accommodationList: Review[] = [];


  constructor(private httpClient: HttpClient ) {
  }
  getAll(): Observable<Review[]>{
    return  this.httpClient.get<Review[]>(environment.apiHost + 'api/reviews/all')
  }
  findById(id: number): Observable<Review>{
    return this.httpClient.get<Review>(environment.apiHost + 'api/reviews/' + id)
  }
  findByAccommodationId(id: number): Observable<Review[]>{
    return this.httpClient.get<Review[]>(environment.apiHost + 'api/reviews?accommodationId=' + id)
  }

  findByHostId(id: number): Observable<Review[]>{
    return this.httpClient.get<Review[]>(environment.apiHost + 'api/reviews/host?hostId=' + id)
  }
}
