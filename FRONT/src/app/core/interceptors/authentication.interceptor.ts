import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { IdentityService } from '../services/identity.service';

export const HEADER_IGNORE_INTERCEPTOR = 'X-No-Auth';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(
    private identityService: IdentityService,
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return of(request).pipe(
      switchMap(r => {
        if (r.headers.has(HEADER_IGNORE_INTERCEPTOR)) {
          return of(r);
        } else {
          return this.handleAuthorizationLogic(request);
        }
      }),
      switchMap(r => next.handle(r)),
    );
  }

  private handleAuthorizationLogic(originalRequest: HttpRequest<unknown>): Observable<HttpRequest<unknown>> {
    return of(originalRequest).pipe(
      switchMap(r => this.getAuthorizationToken(r)),
      map(([r, t]) => this.addAuthorizationHeader(r, t)),
    )
  }

  /** Logic to fetch the token - if exists, retrieves from the service; otherwise from the API */
  private getAuthorizationToken(originalRequest: HttpRequest<unknown>): Observable<[HttpRequest<unknown>, string]> {
    return of(originalRequest).pipe(
      switchMap(r =>
        this.identityService.getToken().pipe(map<string, [HttpRequest<unknown>, string]>(t => [r, t]))
      ),
    )
  }

  /** Adds the authentication header */
  private addAuthorizationHeader(originalRequest: HttpRequest<unknown>, authToken: string): HttpRequest<unknown> {
    return originalRequest.clone({ setHeaders: { 'Authorization': 'Bearer ' + authToken } });
  }
}
