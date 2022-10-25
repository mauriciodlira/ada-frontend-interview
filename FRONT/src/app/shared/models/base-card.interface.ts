import { CardStatesEnum } from './card-states.enum';

export interface BaseCard {
    titulo: string,
    conteudo: string,
    lista: CardStatesEnum.ToDo | CardStatesEnum.Doing | CardStatesEnum.Done,
}
