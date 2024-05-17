import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import {catchError, EMPTY, Observable, of, throwError} from 'rxjs';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {KeycloakService} from "../../keycloak/keycloak.service";

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router, private messageService: MessageService, private keycloakService: KeycloakService) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("intercepting: ", req)
    const accessToken = this.keycloakService.keycloak.token;
    // const accessToken: any = localStorage.getItem('user');
    if (req.headers.get('skip')) return next.handle(req).pipe(catchError(err => {
      console.log("checking for errors!", err)
      const error = (err.error ? err.error.message : null) || err.statusText;
      switch (err.status) {
        case 401: {
          // token expired -> goto login, dont return error
          this.logOut()
          return of(error);      // <-- return observable using `of`
        }
        case 418:{
          if (err.error && err.error[0] === '{'){
            this.showToast(JSON.parse(err.error).message)
          }else{
            this.showToast(err.error.message)
          }

          return throwError(error)
        }

        case 500: {
          return throwError(error);
        }

        default: {
          console.log("no error")
          return EMPTY;      // <-- return observable using `of`
        }
      }

    }));

    if (accessToken) {
      req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + accessToken),
      });
      console.log("added access token")
    }
    return next.handle(req).pipe(catchError(err => {
      console.log("checking for errors!", err)
      const error = (err.error ? err.error.message : null) || err.statusText;
      switch (err.status) {
        case 401: {
          // token expired -> goto login, dont return error
          this.logOut()
          return of(error);      // <-- return observable using `of`
        }
        case 418:{
          if (err.error && err.error[0] === '{'){
            this.showToast(JSON.parse(err.error).message)
          }else{
            this.showToast(err.error.message)
          }
          return throwError(error)
        }

        case 500: {
          return throwError(error);
        }

        default: {
          console.log("no error")
          return EMPTY;      // <-- return observable using `of`
        }
      }

    }));
  }

  showToast(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error message',
      key: 'bc',
      detail: message,
      life: 2000,
    });
  }

  logOut()
    :
    void {
    this.authService.logout().subscribe({
      next: (_) => {
        localStorage.removeItem('user');
        this.authService.setUser();
        this.router.navigate(['/login']);
      }
    })
  }
}
