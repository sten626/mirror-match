import { Action } from '@ngrx/store';
import { Pairing } from 'app/shared';

export enum PairingsApiActionTypes {
  CreatePairingsSuccess = '[Pairings/API] Create Pairings Success'
}

export class CreatePairingsSuccess implements Action {
  readonly type = PairingsApiActionTypes.CreatePairingsSuccess;

  constructor(public payload: {round: number, pairings: Pairing[]}) {}
}

export type PairingsApiActionsUnion = CreatePairingsSuccess;
