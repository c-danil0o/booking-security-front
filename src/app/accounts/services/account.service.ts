import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../env/env";
import {Account} from "../../model/account-model";
import {NewAccount} from "../../model/register-model";
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accounts: Account[] = [];


  constructor(private httpClient: HttpClient ) {
  }

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });
  getAll(): Observable<Account[]>{
    return  this.httpClient.get<Account[]>(environment.apiHost + 'api/hosts/all')
  }
  findById(id: number): Observable<Account>{
    return this.httpClient.get<Account>(environment.apiHost + 'api/hosts/' + id)
  }
  register(account: NewAccount): Observable<any>{
    return this.httpClient.post(environment.apiHost + 'api/register', account, {
      responseType: "text",
      headers: this.headers
    })
  }
  confirmRegistration(token: string): Observable<any>{
    return this.httpClient.get(environment.apiHost+ 'api/register/confirm?token=' + token, {
      responseType: "text",
      headers: this.headers
    })
  }
}
