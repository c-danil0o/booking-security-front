import { Injectable } from '@angular/core';
import {Guest} from "../../model/guest-model";
import {HttpClient, HttpParams} from "@angular/common/http";
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

  addFavorite(accommodationId: number, guestId: number): Observable<void>{
    return this.httpClient.get<void>(environment.apiHost + 'api/guests/add-favorite', {
      params: new HttpParams().set('accommodationId', accommodationId).set('guestId', guestId)
    })
  }
  removeFavorite(accommodationId: number, guestId: number): Observable<void>{
    return this.httpClient.get<void>(environment.apiHost + 'api/guests/remove-favorite', {
      params: new HttpParams().set('accommodationId', accommodationId).set('guestId', guestId)
    })
  }

  checkFavorite(accommodationId: number, guestId: number): Observable<boolean>{
    return this.httpClient.get<boolean>(environment.apiHost + 'api/guests/check-favorite', {
      params: new HttpParams().set('accommodationId', accommodationId).set('guestId', guestId)
    })
  }

  update(host: Host): Observable<Host>{
    return this.httpClient.put<Host>(environment.apiHost + 'api/hosts/update', host)
  }

  deleteAccount(id: number): Observable<void> {
    return this.httpClient.delete<void>(environment.apiHost+ 'api/guests/' + id);
  }
}
