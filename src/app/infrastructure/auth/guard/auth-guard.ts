import { CanActivateFn, Router } from "@angular/router";
import { KeycloakService } from "../keycloak.service";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = () => {
  const keycloakService = inject(KeycloakService);
  const router = inject(Router);
  console.log(keycloakService);
  if (!keycloakService.keycloak.authenticated) {
    router.navigate(['login']);
    console.log("Not authenticated")
    return false;
  }
  return true;
};
export const authGuardAdmin: CanActivateFn = () => {
  const keycloakService = inject(KeycloakService);
  const router = inject(Router);
  console.log(keycloakService);
  if (!keycloakService.keycloak.authenticated || keycloakService.getRole() != 'Admin') {
    router.navigate(['login']);
    console.log("Not authenticated")
    return false;
  }
  return true;
};
export const authGuardHost: CanActivateFn = () => {
  const keycloakService = inject(KeycloakService);
  const router = inject(Router);
  console.log(keycloakService);
  if (!keycloakService.keycloak.authenticated || keycloakService.getRole() != 'Host') {
    router.navigate(['login']);
    console.log("Not authenticated")
    return false;
  }
  return true;
};



export const authGuardGuest: CanActivateFn = () => {
  const keycloakService = inject(KeycloakService);
  const router = inject(Router);
  console.log(keycloakService);
  if (!keycloakService.keycloak.authenticated || keycloakService.getRole() != 'Guest') {
    router.navigate(['login']);
    console.log("Not authenticated")
    return false;
  }
  return true;
};


