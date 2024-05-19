import { Injectable, inject } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../auth.service";
import { KeycloakService } from '../keycloak.service';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private keycloakService: KeycloakService, private router: Router
  ) { }

  canActivate(
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {

    if (this.keycloakService.keycloak.isTokenExpired()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
