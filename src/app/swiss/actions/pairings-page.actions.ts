import { Action } from '@ngrx/store';

export enum PairingsPageActionTypes {
  ChangeSelectedRound = '[Pairings Page] Change Selected Round',
  CreatePairings = '[Pairings Page] Create Pairings',
  UpdatePairingsFilter = '[Pairings Page] Update Pairings Filter'
}

export class ChangeSelectedRound implements Action {
  readonly type = PairingsPageActionTypes.ChangeSelectedRound;

  constructor(public payload: number) {}
}

export class CreatePairings implements Action {
  readonly type = PairingsPageActionTypes.CreatePairings;

  constructor(public payload: number) {}
}

export class UpdatePairingsFilter implements Action {
  readonly type = PairingsPageActionTypes.UpdatePairingsFilter;

  constructor(public payload: {filterText: string, showOutstandingOnly: boolean}) {}
}

export type PairingsPageActionsUnion = ChangeSelectedRound | CreatePairings | UpdatePairingsFilter;
