import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Report} from "../model/report-model";
import {environment} from "../../env/env";
import {ReportView} from "../model/report-view-model";

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private reportList: Report[] = [];


  constructor(private httpClient: HttpClient) {

  }

  getAll(): Observable<ReportView[]>{
    return this.httpClient.get<ReportView[]>(environment.apiHost+'api/reports/all');
  }

  saveNewReport(report: Report): Observable<Report>{
    return this.httpClient.post<Report>(environment.apiHost+'api/reports',report);
  }

  deleteReport(id: number): Observable<void>{
    return this.httpClient.delete<void>(environment.apiHost + 'api/reports/' + id);
  }

}
