import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CardStatesEnum } from 'src/app/shared/models/card-states.enum';
import { CardCreatePayload, CardModel, CardUpdatePayload } from 'src/app/shared/models/card.interface';
import { ApiFacadeService } from 'src/app/shared/services/api-facade.service';

@Injectable({
  providedIn: 'root'
})
export class CardManagementService {

  constructor(
    private apiService: ApiFacadeService,
  ) { }

  getCards(): Observable<CardModel[]> {
    return this.apiService.get<CardModel[]>('cards');
  }

  createCard(title: string, content: string, state: CardStatesEnum): Observable<CardModel[]> {
    const payload: CardCreatePayload = {
      conteudo: content,
      titulo: title,
      lista: state.toString(),
    };

    return this.apiService.post<CardModel[], CardCreatePayload>(
      'cards',
      payload,
    );
  }

  updateCard(cardId: string, title: string, content: string, state: CardStatesEnum): Observable<CardModel> {
    const payload: CardUpdatePayload = {
      id: cardId,
      conteudo: content,
      lista: state.toString(),
      titulo: title,
    }

    return this.apiService.put<CardModel, CardUpdatePayload>(
      `cards/${cardId}`,
      payload,
    )
  }

  deleteCard(cardId: string): Observable<CardModel[]> {
    return this.apiService.delete<CardModel[]>(`cards/${cardId}`);
  }

}
