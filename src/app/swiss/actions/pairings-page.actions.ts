import { Action } from '@ngrx/store';

export enum PairingsPageActionTypes {
  ChangeSelectedRound = '[Pairings Page] Change Selected Round',
  CreatePairings = '[Pairings Page] Create Pairings',
  RedoMatches = '[Pairings Page] Redo Matches',
  SelectPairing = '[Pairings Page] Select Pairing',
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

export class RedoMatches implements Action {
  readonly type = PairingsPageActionTypes.RedoMatches;

  constructor(public payload: number) {}
}

export class SelectPairing implements Action {
  readonly type = PairingsPageActionTypes.SelectPairing;

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

export type PairingsPageActionsUnion =
  ChangeSelectedRound
  | CreatePairings
  | RedoMatches
  | SelectPairing
  | UpdatePairingsFilterText
  | UpdateShowOutstandingOnly;
