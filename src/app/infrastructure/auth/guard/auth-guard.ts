import { CanActivateFn, Router } from "@angular/router";
import { KeycloakService } from "../keycloak.service";
import { inject } from "@angular/core";

export const authGuard: CanActivateFn = () => {
  const keycloakService = inject(KeycloakService);
  const router = inject(Router);
  console.log(keycloakService);
  if (!keycloakService.keycloak.authenticated){
    router.navigate(['login']);
    console.log("Not authenticated")
    return false;
  }
  return true;
};





