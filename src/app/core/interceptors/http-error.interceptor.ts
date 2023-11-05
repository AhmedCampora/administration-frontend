import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from '@services/toast.service';
import { APIResponse } from '@interfaces/global.interface';
import { AuthService } from '@services/auth.service';
export interface APIErrorResponse extends HttpErrorResponse {
  error: APIResponse;
}
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private toast: ToastService, private auth: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: APIErrorResponse) => {
        let msg = '';
        if (error instanceof HttpErrorResponse) {
          if (error.error instanceof ErrorEvent) {
            console.error('Error Event');
          } else {
            switch (error.status) {
              case 401: //login
                msg = 'Unauthorized';
                this.auth.logoutLocal();
                break;
              case 403: //forbidden
                // this.toast.showError('Forbidden');
                break;
              case 429: //forbidden
                msg = 'Too many requests';
                this.auth.logoutLocal();
                break;
            }
          }
        }
        if (
          error.error.message !== 'No Rows' &&
          !req.url.includes('getCities') &&
          (!req.url.includes('auth/signin') || error.status == 429)
        ) {
          this.toast.showError(
            msg ||
              error.error.message ||
              error.error.clientMessage ||
              'Unknown error'
          );
        }
        return throwError(error.error.message);
      })
    );
  }
}
