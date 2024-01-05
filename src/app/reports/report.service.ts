import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Report} from "../model/report-model";
import {environment} from "../../env/env";

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private reportList: Report[] = [];


  constructor(private httpClient: HttpClient) {

  }

  getAll(): Observable<Report[]>{
    return this.httpClient.get<Report[]>(environment.apiHost+'api/reports/all');
  }

  saveNewReport(report: Report): Observable<Report>{
    return this.httpClient.post<Report>(environment.apiHost+'api/reports',report);
  }

}
