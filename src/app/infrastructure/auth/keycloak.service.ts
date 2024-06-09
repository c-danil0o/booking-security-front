import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js'
import { UserProfile } from './model/user-profile';
import { DebuggerType } from "html2canvas/dist/types/core/debugger";
import * as buffer from "node:buffer";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/env/env';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private _keycloak: Keycloak | undefined;

  private _profile: UserProfile | undefined;

  accountConfirmed: boolean = true;
  get keycloak() {
    if (!this._keycloak) {

      this._keycloak = new Keycloak({
        url: 'https://localhost:8443',
        realm: 'SpringBoot',
        clientId: 'login-app'
      });
    }
    return this._keycloak;
  }

  get profile() {
    return this._profile;
  }

  constructor(private httpClient: HttpClient) {
  }

  async init() {
    const autenticated = await this.keycloak?.init({
      // onLoad: 'login-required'
    });

    if (autenticated) {
      this._profile = (await this.keycloak?.loadUserProfile()) as UserProfile;
      this._profile.token = this.keycloak?.token;
    }

  }

  login() {
    return this.keycloak?.login();
  }

  register() {
    return this.keycloak?.register({ redirectUri: 'https://localhost:4201/register' });
  }

  logout() {
    return this.keycloak?.logout({ redirectUri: 'https://localhost:4201' });
  }

  getRole(): string | null {
    if (this.isLoggedIn()) {
      const roles = ['Host', 'Guest', 'Admin'];
      for (let i = 0; i < 3; i++) {
        if (this.keycloak.realmAccess?.roles.includes(roles[i])) {
          return roles[i];
        }
      }
      return null;
    }
    return null;
  }

  checkIfUserExists(userId: number): Observable<boolean> {
    return this.httpClient.get<boolean>(environment.apiHost + 'api/accounts/check/' + userId);
  }



  getId(): number {
    if (this.keycloak.tokenParsed != null) {
      var uuid = this.keycloak.tokenParsed.sub?.replace(/-/g, "");

      var hex = "0x" + uuid?.slice(0, uuid.length / 2 - 3);
      return Number(hex);

    }
    return -1;
  }


  async refreshToken() {
    try {
      await this.keycloak.updateToken(30);
    } catch (error) {
      console.error('Failed to refresh token:', error);
    }
  }
  getGuid() {
    if (this.keycloak.tokenParsed != null) {
      return this.keycloak.tokenParsed.sub;
    }
    return undefined;
  }

  isLoggedIn(): boolean | undefined {
    return this.keycloak?.authenticated;
  }
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });


}
