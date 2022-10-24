import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { isStringEmpty } from 'src/app/shared/utils/string-utils';
import { IdentityService } from '../services/identity.service';

/**
 * TODO - ROADMAP
 * [ ] encontrar o motivo de não estar sendo chamado para realizar a primeira requisição
 */
@Injectable({ providedIn: 'root' })
export class AuthenticationGuard implements CanLoad {
  constructor(
    private identityService: IdentityService,
  ) {
    console.log('authentication guard has been built guard');
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> {
      console.log('verifying route...', route);
      return this.identityService.getToken().pipe(
        map(r => {
          console.log('guard came response:', r);
          return !isStringEmpty(r) && r.length > 0
        }),
      )
  }
}
