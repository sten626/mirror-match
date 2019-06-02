import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { PairingService } from 'app/shared';
import * as fromSwiss from 'app/swiss/reducers';
import { combineLatest, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { PairingsApiActions, PairingsPageActions } from '../actions';

@Injectable()
export class PairingEffects {
  @Effect()
  createPairings$: Observable<Action> = this.actions$.pipe(
    ofType(PairingsPageActions.PairingsPageActionTypes.CreatePairings),
    map(action => action.payload),
    mergeMap((round: number) => {
      const isLastRound$ = this.store.pipe(
        select(fromSwiss.getNumberOfRounds),
        map(numberOfRounds => round === numberOfRounds)
      );
      const activePlayers$ = this.store.pipe(
        select(fromSwiss.getActivePlayers)
      );

      return combineLatest(isLastRound$, activePlayers$).pipe(
        mergeMap(([isLastRound, players]) => this.pairingsService.createPairings(round, isLastRound, players))
      );
    }),
    map(pairings => new PairingsApiActions.CreatePairingsSuccess({round: round, pairings: pairings}))
  );

  constructor(
    private actions$: Actions<PairingsPageActions.PairingsPageActionsUnion>,
    private pairingsService: PairingService,
    private store: Store<fromSwiss.State>
  ) {}
}
