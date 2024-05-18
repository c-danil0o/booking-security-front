import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js'
import { UserProfile } from './model/user-profile';

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
  constructor() { }
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
    return this.keycloak?.logout({ redirectUri: 'https://localhost:4201' });
  }

}
