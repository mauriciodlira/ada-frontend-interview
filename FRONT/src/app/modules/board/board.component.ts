import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, filter, map, Subject, switchMap, takeUntil } from 'rxjs';
import { CardManagementService } from 'src/app/core/services/card-management.service';
import { CardComponent } from 'src/app/shared/components/card/card.component';
import { ColumnComponent } from 'src/app/shared/components/column/column.component';
import { CardStatesEnum } from 'src/app/shared/models/card-states.enum';
import { CardCreatePayload, CardModel, CardUpdatePayload } from 'src/app/shared/models/card.interface';

/**
 * TODO - ROADMAP
 * [ ] Adicionar as colunas ao template
 * [ ] Implementar lógica de exibição dos cartões
 * [ ] Implementar service que terá lógica de negócios relacionadas
 */
@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ColumnComponent,
    CardComponent,
  ],
  selector: 'ada-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  possibleColumns = [CardStatesEnum.ToDo, CardStatesEnum.Doing, CardStatesEnum.Done];
  groupedCards: Map<CardStatesEnum, CardModel[]> = new Map();

  constructor(
    private cardManagementService: CardManagementService,
  ) { }

  ngOnInit(): void {
    this.getCards()
      .subscribe(groupedCards => {
        this.saveGroupedCardsState(groupedCards);
      });;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }

  addCard(x: CardCreatePayload) {
    this.cardManagementService.createCard(x).pipe(
      takeUntil(this.unsubscribe$),
      switchMap(() => this.getCards()),
    ).subscribe(r => {
      this.saveGroupedCardsState(r);
    });
  }

  updateCard(x: CardUpdatePayload) {
    this.cardManagementService.updateCard(x).pipe(
      takeUntil(this.unsubscribe$),
      switchMap(() => this.getCards()),
    ).subscribe(r => this.saveGroupedCardsState(r));
  }

  deleteCard(x: string) {
    this.cardManagementService.deleteCard(x).pipe(
      takeUntil(this.unsubscribe$),
      switchMap(() => this.getCards()),
    ).subscribe(r => this.saveGroupedCardsState(r));
  }

  private getCards(state?: CardStatesEnum) {
    return this.cardManagementService.getCards()
      .pipe(
        takeUntil(this.unsubscribe$),
        map(allCards => state ? allCards.filter(c => c.lista == state) : allCards),
        map(filteredCards => this.groupCardsByState(filteredCards)),
      );
  }

  private groupCardsByState(cards: CardModel[]): Map<CardStatesEnum, CardModel[]> {
    return cards.reduce((accum, curr) => {
      const cardState = curr.lista;
      accum.set(cardState, [...(accum.get(cardState) ?? []), curr]);
      return accum;
    }, new Map());
  }

  private saveGroupedCardsState(groupedCards: Map<CardStatesEnum, CardModel[]>) {
    this.groupedCards = groupedCards
  }
}
