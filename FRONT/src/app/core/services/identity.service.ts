import { Inject, Injectable } from '@angular/core';
import { Observable, of, tap, map } from 'rxjs';
import { BaseURL, BASE_URL, CredentialsPayload, CREDENTIALS_PAYLOAD } from 'src/app/configs/config-tokens';
import { CredentialsResponse } from 'src/app/shared/models/credentials.interface';
import { UserInfo } from 'src/app/shared/models/user-info.interface';
import { ApiFacadeService } from 'src/app/shared/services/api-facade.service';
import { isStringEmpty } from 'src/app/shared/utils/string-utils';

/**
 * TODO - ROADMAP
 * [ ] implementar decodificação do JWT 
 * [ ] quando decodificado, obter a hora de expiração para fazer renovação automática 3x
 */
@Injectable({
  providedIn: 'root',
})
export class IdentityService {
  private userInfo?: UserInfo = undefined;
  private jwtToken: string | undefined;

  constructor(
    @Inject(CREDENTIALS_PAYLOAD) private credentialsPayload: CredentialsPayload,
    private apiService: ApiFacadeService,
  ) {
  }

  getToken(forceRefresh?: boolean): Observable<string> {
    if (forceRefresh || isStringEmpty(this.jwtToken)) {
      return this.apiService.post<string, CredentialsPayload>(
        'login',
        this.credentialsPayload,
        true,
      ).pipe(
        tap(r => this.saveSessionToService(r)),
      );
    } else {
      return of(this.jwtToken!);
    }
  }

  private saveSessionToService(newToken: string) {
    this.jwtToken = newToken;
  }
}
