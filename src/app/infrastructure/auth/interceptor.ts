import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("intercepting: ", req)
    const accessToken: any = localStorage.getItem('user');
    if (req.headers.get('skip')) return next.handle(req);

    if (accessToken) {
      req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + accessToken),
      });
      console.log("added access token")
    }
    return next.handle(req).pipe(catchError(err => {
      console.log("checking for errors!", err)
      if (err.status === 401) {
        this.logOut()
      }
      const error = err.error.message || err.statusText;
      return throwError(error)
    }));
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
