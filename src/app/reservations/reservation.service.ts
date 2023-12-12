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

  approveReservation(id: number): Observable<void> {
    const url = `${environment.apiHost}api/reservations/${id}/approve`;
    return this.httpClient.put<void>(url, {});
  }

  denyReservation(id: number): Observable<void>{
    const url = `${environment.apiHost}api/reservations/${id}/deny`;
    return this.httpClient.put<void>(url, {});
  }


}
