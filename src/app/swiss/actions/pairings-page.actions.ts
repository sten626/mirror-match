import { Action } from '@ngrx/store';

export enum PairingsPageActionTypes {
  CreatePairings = '[Pairings Page] Create Pairings'
}

export class CreatePairings implements Action {
  readonly type = PairingsPageActionTypes.CreatePairings;
}
