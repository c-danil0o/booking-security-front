import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CSR} from "../model/CSR";
import {Observable} from "rxjs";
import { SignedCertificate } from '../model/SignedCertificate';
import { environment } from 'src/env/env';
import { CertificateDownload } from '../model/Certificate-download';

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor(private httpClient: HttpClient) { }


  sendCertificateRequest(request: CSR): Observable<boolean>{
    return this.httpClient.post<boolean>("https://localhost:8081/request", request);
  }

  downloadCertificate(alias: string): Observable<SignedCertificate>{
    return this.httpClient.get<SignedCertificate>("https://localhost:8081/certificate/download/" + alias);

  }

  checkCertificate(certificate: SignedCertificate): Observable<CertificateDownload> {
    return this.httpClient.post<CertificateDownload>(environment.apiHost + 'api/certificate/check', certificate);
  }


}
