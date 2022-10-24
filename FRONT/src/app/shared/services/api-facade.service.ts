import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseURL, BASE_URL } from 'src/app/configs/config-tokens';
import { HEADER_IGNORE_INTERCEPTOR } from 'src/app/core/interceptors/authentication.interceptor';

@Injectable({
  providedIn: 'root'
})
export class ApiFacadeService {
  private treatedURL = (str: string) => {
    const segment = str?.trim() ?? '';
    if (segment.startsWith('/')) {
      return this.baseUrl + segment;
    } else {
      return `${this.baseUrl}/${segment}`;
    }
  }

  constructor(
    @Inject(BASE_URL) private baseUrl: BaseURL,
    private httpClient: HttpClient,
  ) { }

  get<T>(destinationURL: string, parameters?: HttpParams): Observable<T> {
    return this.httpClient.get<T>(
      this.treatedURL(destinationURL),
      {
        params: parameters,
        observe: 'body',
      }
    );
  }


  post<T, B>(destinationURL: string, body: B, ignoreInterceptor?: boolean): Observable<T> {
    return this.httpClient.post<T>(
      this.treatedURL(destinationURL),
      body,
      {
        headers: !ignoreInterceptor ? new HttpHeaders() : new HttpHeaders().set(HEADER_IGNORE_INTERCEPTOR, 'yas'),
        observe: 'body',
      }
    );
  }

  put<T, B>(destinationURL: string, body: B): Observable<T> {
    return this.httpClient.put<T>(
      this.treatedURL(destinationURL),
      body,
      {
        observe: 'body',
      }
    );
  }

  delete<T>(destinationURL: string): Observable<T> {
    return this.httpClient.delete<T>(
      this.treatedURL(destinationURL),
    );
  }
}
