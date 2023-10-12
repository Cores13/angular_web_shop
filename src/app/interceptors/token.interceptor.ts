import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/api/auth/auth.service';
import { Router } from '@angular/router';
import { TokenApiModel } from '../models/token-api.model';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const jwtToken = this.authService.getToken();

    if(jwtToken){
      request = request.clone({
        setHeaders: { 'Authorization': 'Bearer ' + jwtToken},
      });
    }

    return next.handle(request).pipe(
      catchError((error) => {
        if(error instanceof HttpErrorResponse){
          if(error.status === 401){
            return this.handleUnauthorizedError(request, next)
          }
        }
        return throwError(() => new Error(error));
      })
    );
  }
  handleUnauthorizedError(request: HttpRequest<any>, next: HttpHandler) {
    let tokenApiModel = new TokenApiModel();
    tokenApiModel.accessToken = this.authService.getToken()!;
    tokenApiModel.refreshToken = this.authService.getRefreshToken()!;

    return this.authService.renewToken(tokenApiModel).pipe(
      switchMap((data: TokenApiModel) => {
        this.authService.storeRefreshToken(data.refreshToken);
        this.authService.storeToken(data.accessToken);
        let req = request.clone({
          setHeaders: { 'Authorization': 'Bearer ' + data.accessToken },
        });

        return next.handle(req);
      }),
      catchError((err) => {
        return throwError(() => {
          this.router.navigate(['login']);
        });
      })
    );
  }
}
