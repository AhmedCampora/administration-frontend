import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from '@shared/services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  counter: number = 0;
  constructor(private loaderService: LoaderService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const isLoaderEnabled =
      !request.params.has('loader') || request.params.get('loader') !== 'no';
    if (isLoaderEnabled) {
      this.loaderService.show();
      this.counter++;
    }
    return next.handle(request).pipe(
      finalize(() => {
        this.counter--;
        if (this.counter <= 0) {
          this.loaderService.hide();
        }
      })
    );
  }
}
// const params = new HttpParams().set('loader', 'no');
// this.http.get(`${configuration.apiURL}`, {params});