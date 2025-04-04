import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { IdleTimeoutService } from './idle-timeout.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  constructor(private idleTimeoutService: IdleTimeoutService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap(
        async (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
          }
          this.idleTimeoutService.resetTimer();
        },
        (err: any) => {}
      ),
      catchError((error: HttpErrorResponse) => {
        if ((error && error.status == 401) || error.status == 400) {
        }
        return throwError(error);
        // this.onSubscribeError(error);
      })
    );
  }
}
