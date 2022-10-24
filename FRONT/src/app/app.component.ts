import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiFacadeService } from './shared/services/api-facade.service';
import { CardManagementService } from './core/services/card-management.service';
import { CardStatesEnum } from './shared/models/card-states.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FRONT';
  constructor(
    private cardManagementService: CardManagementService,
  ) {}

  loadCards() {
    this.cardManagementService.getCards().subscribe(x => console.log('x:', x));
  }

  postCard() {
    this.cardManagementService.createCard('temp','temp content in markdown', CardStatesEnum.ToDo).subscribe(x => console.log('after creation: ', x));
  }

}
