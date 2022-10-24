import { BaseCard } from './base-card.interface';
import { Identifiable } from './identifiable.interface';

type IdentifiableBaseCard = Identifiable & BaseCard;

/** Representation of the response of the Card API */
export interface CardModel extends IdentifiableBaseCard {}

/** Representation of the payload required to create a card */
export interface CardCreatePayload extends BaseCard {}

/** Representation of the payload required to update a card */
export interface CardUpdatePayload extends IdentifiableBaseCard {}
