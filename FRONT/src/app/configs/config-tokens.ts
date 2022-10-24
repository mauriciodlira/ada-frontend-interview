import { InjectionToken } from '@angular/core';
import { environment } from 'src/environments/environment';

/** API URL injection token */
export const BASE_URL = new InjectionToken<BaseURL>('BASE_URL', { factory: () => '/api' });
/** API URL type alias */
export type BaseURL = string;


/** Default payload to request a JWT Token */
export const CREDENTIALS_PAYLOAD = new InjectionToken<CredentialsPayload>('CREDENTIALS', {
    factory: () => ({
        login: environment.apiCredentials?.login ?? 'unknown',
        senha: environment.apiCredentials?.pwd ?? 'unknown',
    }),
});
export interface CredentialsPayload {
    login: string,
    senha: string,
}