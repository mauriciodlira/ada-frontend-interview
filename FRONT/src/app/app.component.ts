import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiFacadeService } from './shared/services/api-facade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FRONT';
  constructor(private httpService: ApiFacadeService ) {}

  loadCards() {
    this.httpService.loadCards();
  }
}
