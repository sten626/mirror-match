import { Action } from '@ngrx/store';

export enum PairingsPageActionTypes {
  ChangeSelectedRound = '[Pairings Page] Change Selected Round',
  CreatePairings = '[Pairings Page] Create Pairings'
}

export class ChangeSelectedRound implements Action {
  readonly type = PairingsPageActionTypes.ChangeSelectedRound;

  constructor(public payload: number) {}
}

export class CreatePairings implements Action {
  readonly type = PairingsPageActionTypes.CreatePairings;

  constructor(public payload: number) {}
}

export type PairingsPageActionsUnion = ChangeSelectedRound | CreatePairings;
