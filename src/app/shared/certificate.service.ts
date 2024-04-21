import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CSR} from "../model/CSR";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(private httpClient: HttpClient) { }


  sendCertificateRequest(request: CSR): Observable<boolean>{
    return this.httpClient.post<boolean>("http://localhost:8081/request", request);
  }


}
