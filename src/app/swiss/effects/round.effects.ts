import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Round, RoundStorageService } from 'app/shared';
import { PairingsApiActions, PairingsPageActions, PlayersPageActions, RoundApiActions } from 'app/swiss/actions';
import * as fromSwiss from 'app/swiss/reducers';
import { combineLatest } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class RoundEffects implements OnInitEffects {
  addPairings$ = createEffect(() => this.actions$.pipe(
    ofType(PairingsApiActions.createPairingsSuccess),
    map(({pairings, roundId}) => ({
      id: roundId,
      pairingIds: pairings.map(p => p.id)
    }) as Round),
    mergeMap(round =>
      this.storageService.updateRound(round).pipe(
        map(() => RoundApiActions.updateRound({round: {
          id: round.id,
          changes: {
            pairingIds: round.pairingIds
          }
        }}))
      )
    )
  ));

  beginEvent$ = createEffect(() => this.actions$.pipe(
    ofType(PlayersPageActions.beginEvent),
    mergeMap(({numberOfRounds}) =>
      this.storageService.setNumberOfRounds(numberOfRounds).pipe(
        map(() => RoundApiActions.beginEventSuccess({numberOfRounds}))
      )
    ),
    tap(() => this.router.navigate(['/swiss/pairings']))
  ));

  changeSelectedRound$ = createEffect(() => this.actions$.pipe(
    ofType(PairingsPageActions.changeSelectedRound),
    mergeMap(({roundId}) =>
      this.storageService.setSelectedRound(roundId).pipe(
        map(() => RoundApiActions.setSelectedRound({roundId}))
      )
    )
  ));

  createFirstRound$ = createEffect(() => this.actions$.pipe(
    ofType(RoundApiActions.beginEventSuccess),
    map(() => ({
      id: 1,
      pairingIds: []
    }) as Round),
    mergeMap(round =>
      this.storageService.addRound(round).pipe(
        map(() => RoundApiActions.addRound({round}))
      )
    )
  ));

  lastMatchResultSubmitted = createEffect(() => this.actions$.pipe(
    ofType(PairingsApiActions.submitResultSuccess),
    switchMap(() =>
      this.st
    )
  ));

  loadRounds$ = createEffect(() => this.actions$.pipe(
    ofType(RoundApiActions.loadRounds),
    switchMap(() => {
      const rounds$ = this.storageService.getRounds();
      const numberOfRounds$ = this.storageService.getNumberOfRounds();
      const selectedRoundId$ = this.storageService.getSelectedRound();

      return combineLatest(rounds$, numberOfRounds$, selectedRoundId$);
    }),
    map(([rounds, numberOfRounds, selectedRoundId]) => RoundApiActions.loadRoundsSuccess({numberOfRounds, rounds, selectedRoundId}))
  ));

  constructor(
    private actions$: Actions,
    private router: Router,
    private storageService: RoundStorageService,
    private store: Store<fromSwiss.State>
  ) {}

  ngrxOnInitEffects(): Action {
    return RoundApiActions.loadRounds();
  }
}
