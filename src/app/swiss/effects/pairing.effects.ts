import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { Pairing, PairingService, PairingStorageService } from 'app/shared';
import { PairingsApiActions, PairingsPageActions } from 'app/swiss/actions';
import * as fromSwiss from 'app/swiss/reducers';
import { combineLatest, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class PairingEffects implements OnInitEffects {
  addPairings$ = createEffect(() => this.actions$.pipe(
    ofType(PairingsApiActions.createPairingsSuccess),
    mergeMap(({pairings}) =>
      this.storageService.addPairings(pairings).pipe(
        map(() => PairingsApiActions.addPairings({pairings}))
      )
    )
  ));

  createPairings$ = createEffect(() => this.actions$.pipe(
    ofType(PairingsPageActions.createPairings),
    switchMap(({roundId}) => {
      const isLastRound$ = this.store.pipe(
        select(fromSwiss.getNumberOfRounds),
        map(numberOfRounds => roundId === numberOfRounds)
      );
      const activePlayers$ = this.store.pipe(
        select(fromSwiss.getActivePlayers)
      );

      return combineLatest(isLastRound$, activePlayers$).pipe(
        switchMap(([isLastRound, activePlayers]) =>
          this.pairingsService.createPairings(roundId, isLastRound, activePlayers, this.nextId).pipe(
            map(pairings => PairingsApiActions.createPairingsSuccess({pairings, roundId}))
          )
        )
      );
    })
  ));

  @Effect()
  loadPairings$: Observable<Action> = this.actions$.pipe(
    ofType(PairingsApiActions.PairingsApiActionTypes.LoadPairings),
    switchMap(() =>
      this.storageService.getPairings().pipe(
        tap((pairings: Pairing[]) => {
          if (pairings.length > 0) {
            this.nextId = Math.max(...pairings.map(p => p.id)) + 1;
          } else {
            this.nextId = 1;
          }
        }),
        map((pairings: Pairing[]) => new PairingsApiActions.LoadPairingsSuccess(pairings)),
        catchError(err => of(new PairingsApiActions.LoadPairingsFailure(err)))
      )
    )
  );

  private nextId = 1;

  constructor(
    private actions$: Actions,
    private pairingsService: PairingService,
    private storageService: PairingStorageService,
    private store: Store<fromSwiss.State>
  ) {}

  ngrxOnInitEffects() {
    return new PairingsApiActions.LoadPairings();
  }
}
