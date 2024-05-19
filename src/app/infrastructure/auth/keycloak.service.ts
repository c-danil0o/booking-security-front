import {Injectable} from '@angular/core';
import Keycloak from 'keycloak-js'
import {UserProfile} from './model/user-profile';
import {DebuggerType} from "html2canvas/dist/types/core/debugger";
import * as buffer from "node:buffer";

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private _keycloak: Keycloak | undefined;

  private _profile: UserProfile | undefined;

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

  constructor() {
  }

  async init() {
    const autenticated = await this.keycloak?.init({
      onLoad: 'login-required'
    });

    if (autenticated) {
      this._profile = (await this.keycloak?.loadUserProfile()) as UserProfile;
      this._profile.token = this.keycloak?.token;
    }

  }

  login() {
    return this.keycloak?.login();
  }

  logout() {
    return this.keycloak?.logout({redirectUri: 'https://localhost:4201'});
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


  getId(): number | undefined {
    if (this.keycloak.tokenParsed != null) {
      var uuid = this.keycloak.tokenParsed.sub?.replace(/-/g, "");

      var hex = "0x" + uuid?.slice(0, uuid.length / 2);
      return Number(hex);

    }
    return undefined;
  }


  getGuid() {
    if (this.keycloak.tokenParsed != null) {
      return this.keycloak.tokenParsed.sub;
    }
    return undefined;
  }

  isLoggedIn(): boolean {
    return !this.keycloak?.isTokenExpired();
  }

}
