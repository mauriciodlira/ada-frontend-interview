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

  createCard(payload: CardCreatePayload): Observable<CardModel[]> {
    const p: CardCreatePayload = {
      conteudo: payload.conteudo,
      titulo: payload.titulo,
      lista: CardStatesEnum.ToDo,
    };

    return this.apiService.post<CardModel[], CardCreatePayload>(
      'cards',
      p,
    );
  }

  updateCard(payload: CardUpdatePayload): Observable<CardModel> {
    const cardId = payload.id;

    return this.apiService.put<CardModel, CardUpdatePayload>(
      `cards/${cardId}`,
      payload,
    )
  }

  deleteCard(cardId: string): Observable<CardModel[]> {
    return this.apiService.delete<CardModel[]>(`cards/${cardId}`);
  }

}
