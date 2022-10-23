import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BaseURL, BASE_URL } from 'src/app/configs/config-tokens';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiFacadeService {
  private asUrl = (str: string) => this.baseUrl + str;

  constructor(
    private httpClient: HttpClient,
    @Inject(BASE_URL) private baseUrl: BaseURL,
  ) { }

  loadCards() {
    return this.httpClient.post(
      this.asUrl('/login'),
      { login: environment.apiCredentials.login, senha: environment.apiCredentials.pwd },
    ).subscribe(x => {
      console.log('respondeu:', x);
    });
  }
}
