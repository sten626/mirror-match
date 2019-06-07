import { Action } from '@ngrx/store';

export enum PairingsPageActionTypes {
  ChangeSelectedRound = '[Pairings Page] Change Selected Round',
  CreatePairings = '[Pairings Page] Create Pairings',
  UpdatePairingsFilterText = '[Pairings Page] Update Pairings Filter Text',
  UpdateShowOutstandingOnly = '[Pairings Page] Update Show Outstanding Only'
}

export class ChangeSelectedRound implements Action {
  readonly type = PairingsPageActionTypes.ChangeSelectedRound;

  constructor(public payload: number) {}
}

export class CreatePairings implements Action {
  readonly type = PairingsPageActionTypes.CreatePairings;

  constructor(public payload: number) {}
}

export class UpdatePairingsFilterText implements Action {
  readonly type = PairingsPageActionTypes.UpdatePairingsFilterText;

  constructor(public payload: string) {}
}

export class UpdateShowOutstandingOnly implements Action {
  readonly type = PairingsPageActionTypes.UpdateShowOutstandingOnly;

  constructor(public payload: boolean) {}
}

export type PairingsPageActionsUnion = ChangeSelectedRound | CreatePairings | UpdatePairingsFilterText | UpdateShowOutstandingOnly;
