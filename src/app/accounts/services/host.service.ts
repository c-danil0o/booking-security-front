import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Host} from "../../model/host-model";
import {environment} from "../../../env/env";
@Injectable({
  providedIn: 'root'
})
export class HostService {
  private hosts: Host[] = [];


  constructor(private httpClient: HttpClient ) {
  }
  getAll(): Observable<Host[]>{
    return  this.httpClient.get<Host[]>(environment.apiHost + 'api/hosts/all')
  }
  findById(id: number): Observable<Host>{
    return this.httpClient.get<Host>(environment.apiHost + 'api/hosts/' + id)
  }
}
