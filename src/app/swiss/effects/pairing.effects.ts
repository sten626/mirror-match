import { Injectable } from '@angular/core';
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { PairingService, PairingStorageService, Pairing } from 'app/shared';
import { PairingsApiActions, PairingsPageActions } from 'app/swiss/actions';
import * as fromSwiss from 'app/swiss/reducers';
import { Observable, of, combineLatest } from 'rxjs';
import { map, mergeMap, switchMap, catchError, tap } from 'rxjs/operators';

@Injectable()
export class PairingEffects implements OnInitEffects {
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
        mergeMap(([isLastRound, players]) => this.pairingsService.createPairings(round, isLastRound, players, this.nextId)),
        map((pairings: Pairing[]) => ({
          id: round,
          pairings: pairings
        })),
        mergeMap((r: Round) =>
          this.storageService.updateRound(r).pipe(
            map(() => new RoundApiActions.CreatePairingsSuccess(r)),
            catchError(err => of(new RoundApiActions.CreatePairingsFailure(err)))
          )
        )
      );
    })
  );

  @Effect()
  loadPairings$: Observable<Action> = this.actions$.pipe(
    ofType(PairingsApiActions.PairingsApiActionTypes.LoadPairings),
    switchMap(() =>
      this.storageService.getPairings().pipe(
        tap((pairings: Pairing[]) => this.nextId = Math.max(...pairings.map(p => p.id)) + 1),
        map((pairings: Pairing[]) => new PairingsApiActions.LoadPairingsSuccess(pairings)),
        catchError(err => of(new PairingsApiActions.LoadPairingsFailure(err)))
      )
    )
  );

  private nextId = 1;

  constructor(
    private actions$: Actions<PairingsPageActions.PairingsPageActionsUnion>,
    private pairingsService: PairingService,
    private storageService: PairingStorageService,
    private store: Store<fromSwiss.State>
  ) {}

  ngrxOnInitEffects() {
    return new PairingsApiActions.LoadPairings();
  }
}
