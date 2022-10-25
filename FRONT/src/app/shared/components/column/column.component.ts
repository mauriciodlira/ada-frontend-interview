import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardStatesEnum } from '../../models/card-states.enum';
import { CardCreatePayload, CardModel, CardUpdatePayload } from '../../models/card.interface';
import { CardComponent } from '../card/card.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    CardComponent,
  ],
  selector: 'ada-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {
  @Input() state?: CardStatesEnum;
  @Input() cards: CardModel[] = [];

  cardStates = CardStatesEnum;

  @Output() create: EventEmitter<CardCreatePayload> = new EventEmitter();
  @Output() update: EventEmitter<CardUpdatePayload> = new EventEmitter();
  @Output() delete: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  createCard(newCard: CardCreatePayload) {
    console.log('col create', newCard);
    this.create.emit(newCard);
  }

  updateCard(updateCardInfo: CardUpdatePayload) {
    console.log('col update', updateCardInfo);
    this.update.emit(updateCardInfo);
  }
  
  deleteCard(cardId: string) {
    console.log('col delete', cardId);
    this.delete.emit(cardId);
  }

}
