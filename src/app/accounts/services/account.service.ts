import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../env/env";
import { Account } from "../../model/account-model";
import { NewAccount } from "../../model/register-model";
import { NewPassword } from "src/app/model/password-change-model";
import { Email } from "../../model/Email";
import { Guest } from "../../model/guest-model";
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accounts: Account[] = [];


  constructor(private httpClient: HttpClient) {
  }

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    skip: 'true',
  });

  getAll(): Observable<Account[]> {
    return this.httpClient.get<Account[]>(environment.apiHost + 'api/hosts/all')
  }

  findByEmail(email: Email): Observable<Account> {
    return this.httpClient.post<Account>(environment.apiHost + 'api/accounts/email', email)
  }

  findById(id: number): Observable<Account> {
    return this.httpClient.post<Account>(environment.apiHost + 'api/accounts/', id)
  }

  register(account: NewAccount): Observable<any> {
    return this.httpClient.post(environment.apiHost + 'api/register', account, {
      responseType: "text",
      headers: this.headers
    })
  }

  changePassword(passwordAccount: NewPassword): Observable<void> {
    console.log(JSON.stringify(passwordAccount));
    return this.httpClient.post<void>(environment.apiHost + 'api/passwordChange', passwordAccount)
  }

  deleteAccount(id: number): Observable<void> {
    return this.httpClient.delete<void>(environment.apiHost + 'api/accounts/' + id);
  }

  blockAccount(id: number): Observable<void> {
    return this.httpClient.patch<void>(environment.apiHost + 'api/accounts/' + id + "/block", null);
  }
}
