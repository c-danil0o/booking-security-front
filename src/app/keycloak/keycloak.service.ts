import { Injectable } from '@angular/core';
import {CertificateService} from "../shared/certificate.service";
import Keycloak from "keycloak-js";
import {environment} from "../../env/env";
import { User } from '../model/user-model';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private _keycloak: Keycloak | undefined
  private _profile: User | undefined

  get keycloak(){
    if (!this._keycloak){
      this._keycloak = new Keycloak({
        url: 'http://localhost:8080',
        realm: 'booking',
        clientId: 'bc'
      });
    }
    return this._keycloak;
  }

  get profile() : User | undefined {
    return this._profile;
  }

  constructor() { }

  async init(){
    console.log('keycloak initialized');
    const authenticated = await this.keycloak?.init({
      onLoad: 'login-required'
    })

    if(authenticated){
      this._profile = (await this.keycloak.loadUserProfile()) as User;
      this._profile.token = this.keycloak.token;
    }
  }

  login(){
    return this.keycloak.login();
  }

  logout(){
    return this.keycloak.logout({redirectUri: 'http://localhost:4200'});
  }

}
