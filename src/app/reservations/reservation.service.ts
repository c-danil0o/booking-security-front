import { Injectable } from '@angular/core';
import {Reservation} from "../model/reservation-model";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../env/env";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservationList: Reservation[];
  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(environment.apiHost + 'api/reservations/all');
  }

  getByHostId(id: number): Observable<Reservation[]> {
    const url = `${environment.apiHost}api/reservations/host/${id}`;
    return this.httpClient.get<Reservation[]>(url);
  }

  getByGuestId(id: number): Observable<Reservation[]> {
    const url = `${environment.apiHost}api/reservations/guest/${id}`;
    return this.httpClient.get<Reservation[]>(url);
  }

  approveReservation(id: number): Observable<void> {
    const url = `${environment.apiHost}api/reservations/${id}/approve`;
    return this.httpClient.put<void>(url, {});
  }

  denyReservation(id: number): Observable<void>{
    const url = `${environment.apiHost}api/reservations/${id}/deny`;
    return this.httpClient.put<void>(url, {});
  }

  cancelReservation(id: number): Observable<void>{
    const url = `${environment.apiHost}api/reservations/${id}/cancel`;
    return this.httpClient.put<void>(url, {});
  }


}
