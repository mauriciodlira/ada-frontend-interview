import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardStatesEnum } from '../../models/card-states.enum';
import { CardCreatePayload, CardModel, CardUpdatePayload } from '../../models/card.interface';
import { isValueEmpty } from '../../utils/object-utils';

interface CardForm {
  id: FormControl<string | null>;
  title: FormControl<string | null>;
  content: FormControl<string | null>;
  state: FormControl<CardStatesEnum | null>;
}

type CardMode = 'EDIT' | 'VIEW';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  selector: 'ada-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Output() create: EventEmitter<CardCreatePayload> = new EventEmitter();
  @Output() update: EventEmitter<CardUpdatePayload> = new EventEmitter();
  @Output() delete: EventEmitter<string> = new EventEmitter();

  private _cardModel?: CardModel;
  /** Model that may be present to fill in the card */
  @Input() set cardModel(value: CardModel | undefined) {
    this._cardModel = value;

    const [canBack, canNext] = this.calculateMobility(value?.lista);
    this.canMoveBack = canBack;
    this.canMoveNext = canNext;
  }
  get cardModel(): CardModel | undefined { return this._cardModel };

  /** Internal state - Flag that controls the visibility mode */
  private _cardMode: CardMode = 'VIEW';
  /** Setter function triggered whenever the card mode is changed */
  @Input() set cardMode(value: CardMode) {
    this.toggleCardMode(value);
  };
  get cardMode(): CardMode { return this._cardMode; }

  /** Indicates wether card can move to next column */
  canMoveNext = false;
  /** Indicates wether card can move to previous column */
  canMoveBack = false;

  formGroup?: FormGroup<CardForm>;

  constructor(
  ) { }

  ngOnInit(): void {
    this.formGroup = this.buildForm(this.cardModel);
  }

  toggleCardMode(newMode: CardMode) {
    this._cardMode = newMode;
    this.formGroup = this.buildForm(this.cardModel);
  }

  buildForm(seed?: CardModel): FormGroup<CardForm> {
    const fb = new FormBuilder();
    if (isValueEmpty(seed)) {
      console.log('criando formulário sem raiz')
      return fb.group({
        id: fb.control<string | null>(null),
        title: fb.control<string | null>(null, { validators: [Validators.required, Validators.minLength(3)] }),
        content: fb.control<string | null>(null, { validators: [Validators.required, Validators.minLength(3)] }),
        state: fb.control(CardStatesEnum.ToDo, {}),
      });
    } else {
      return fb.group({
        id: fb.control(seed!.id, { validators: [Validators.required] }),
        title: fb.control(seed!.titulo, { validators: [Validators.required, Validators.minLength(3)] }),
        content: fb.control(seed!.conteudo, { validators: [Validators.required, Validators.minLength(3)] }),
        state: fb.control(seed!.lista, { validators: [Validators.required] }),
      });
    }
  }

  moveTo(dir: 'NEXT' | 'PREV') {
    if (this.cardModel !== undefined) {
      const futureState = this.calculateDestinyState(dir, this.cardModel.lista);
      
      if (futureState !== this.cardModel.lista) {
        this.update.emit({ ...this.cardModel, lista: futureState });
      }
    }
  }

  createClick() {
    if (this.formGroup?.valid) {
      this.create.emit(this.formToCreateParameters());
    }

  }

  updateClick() {
    console.log('update fg:', this.formGroup, this.formToUpdateParameters());
  }
  
  deleteClick() {
    console.log('delete fg:', this.cardModel, !isValueEmpty(this.cardModel?.id));
    if (!isValueEmpty(this.cardModel?.id)) {
      this.delete.emit(this.cardModel!.id);
    }
  }

  private formToCreateParameters(): CardCreatePayload {
    const formValue = this.formGroup?.value;

    return {
      lista: formValue?.state!,
      titulo: formValue?.title!,
      conteudo: formValue!.content!,
    };
  }

  private formToUpdateParameters(): CardUpdatePayload {
    const formValue = this.formGroup?.value;

    return {
      lista: formValue?.state!,
      id: formValue?.id!,
      titulo: formValue?.title!,
      conteudo: formValue?.content!,
    }
  }

  private calculateMobility(currentState?: CardStatesEnum): [boolean, boolean] {
    switch (currentState) {
      case CardStatesEnum.ToDo:
        return [false, true];
      case CardStatesEnum.Doing:
        return [true, true];
      case CardStatesEnum.Done:
        return [true, false];
      default:
        return [false, false];
    }
  }

  private calculateDestinyState(dir: 'NEXT' | 'PREV', currentState?: CardStatesEnum): CardStatesEnum {
    const isNext = dir === 'NEXT';
    switch (currentState) {
      case CardStatesEnum.ToDo:
        return isNext ? CardStatesEnum.Doing : currentState;
      case CardStatesEnum.Doing:
        return isNext ? CardStatesEnum.Done : CardStatesEnum.ToDo;
      case CardStatesEnum.Done:
        return isNext ? currentState : CardStatesEnum.Doing;
      default:
        return currentState ?? CardStatesEnum.ToDo;
    }
  }
}
