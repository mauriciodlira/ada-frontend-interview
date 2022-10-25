import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { map, Observable, of, switchMap } from 'rxjs';

@Injectable()
export class DefaultHeadersInterceptor implements HttpInterceptor {
  private MIME_JSON = 'application/json';
  private POST_PUT = ['POST', 'PUT'];

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return of(request).pipe(
      map(r => this.injectAcceptHeaders(r)),
      map(r => this.injectPostPutContentTypeHeaders(r)),
      switchMap(r => next.handle(r)),
    );
  }

  private injectAcceptHeaders(originalRequest: HttpRequest<unknown>): HttpRequest<unknown> {
    return originalRequest.clone({ setHeaders: { 'Accept': this.MIME_JSON } });
  }

  private injectPostPutContentTypeHeaders(originalRequest: HttpRequest<unknown>): HttpRequest<unknown> {
    if (this.POST_PUT.includes(originalRequest.method.toUpperCase())) {
      return originalRequest.clone({ setHeaders: { 'Content-Type': this.MIME_JSON } });
    } else {
      return originalRequest;
    }
  }
}
