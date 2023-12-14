import { Injectable } from '@angular/core';
import {Guest} from "../../model/guest-model";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {Host} from "../../model/host-model";
import {environment} from "../../../env/env";
import {Email} from "../../model/Email";
import {Accommodation} from "../../model/accommodation-model";

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Guest[]>{
    return  this.httpClient.get<Guest[]>(environment.apiHost + 'api/guests/all')
  }
  findById(id: number): Observable<Guest>{
    return this.httpClient.get<Guest>(environment.apiHost + 'api/guests/' + id)
  }
  findByEmail(email: Email): Observable<Guest>{
    return this.httpClient.post<Guest>(environment.apiHost + 'api/guests/email', email)
  }

  getFavorites(id: number): Observable<Accommodation[]>{
    return this.httpClient.get<Accommodation[]>(environment.apiHost+'api/guests/favorites/'+id);
  }
}
