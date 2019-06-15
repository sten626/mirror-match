import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import { Pairing, PairingService, PairingStorageService, RoundStorageService } from 'app/shared';
import { PairingsApiActions, PairingsPageActions } from 'app/swiss/actions';
import * as fromSwiss from 'app/swiss/reducers';
import { combineLatest, of } from 'rxjs';
import { concatMap, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';

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

  clearMatchResult$ = createEffect(() => this.actions$.pipe(
    ofType(PairingsPageActions.clearMatchResult),
    mergeMap(({pairing}) =>
      this.storageService.clearResults([pairing.id]).pipe(
        map(() => PairingsApiActions.clearMatchResultSuccess({
          pairing: {
            id: pairing.id,
            changes: {
              player1Wins: 0,
              player2Wins: 0,
              draws: 0,
              submitted: false
            }
          }
        }))
      )
    )
  ));

  clearResults$ = createEffect(() => this.actions$.pipe(
    ofType(PairingsPageActions.clearResults),
    map(({pairings}) => pairings.map(p => p.id)),
    mergeMap(pairingIds =>
      this.storageService.clearResults(pairingIds).pipe(
        map(() => {
          const updates = pairingIds.map(pid => ({
            id: pid,
            changes: {
              player1Wins: 0,
              player2Wins: 0,
              draws: 0,
              submitted: false
            }
          }) as Update<Pairing>);
          return PairingsApiActions.clearResultsSuccess({pairings: updates});
        })
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

  deletePairings$ = createEffect(() => this.actions$.pipe(
    ofType(PairingsPageActions.deletePairings),
    concatMap(action => of(action).pipe(
      withLatestFrom(this.store.pipe(
        select(fromSwiss.getRoundEntities)
      ))
    )),
    mergeMap(([{roundId}, roundEntities]) => {
      const pairingIds = roundEntities[roundId].pairingIds;
      const deletePairings$ = this.storageService.deletePairings(pairingIds);
      const updateRound$ = this.roundStorageService.updateRound({
        id: roundId,
        pairingIds: []
      });

      return combineLatest(deletePairings$, updateRound$).pipe(
        map(() => PairingsApiActions.deletePairingsSuccess({pairingIds, roundId}))
      );
    })
  ));

  loadPairings$ = createEffect(() => this.actions$.pipe(
    ofType(PairingsApiActions.loadPairings),
    switchMap(() =>
      this.storageService.getPairings().pipe(
        tap(pairings => {
          if (pairings.length > 0) {
            this.nextId = Math.max(...pairings.map(p => p.id)) + 1;
          } else {
            this.nextId = 1;
          }
        }),
        map(pairings => PairingsApiActions.loadPairingsSuccess({pairings}))
      )
    )
  ));

  submitResult$ = createEffect(() => this.actions$.pipe(
    ofType(PairingsPageActions.submitResult),
    mergeMap(({pairing}) =>
      this.storageService.updatePairing(pairing).pipe(
        map(() => PairingsApiActions.submitResultSuccess({
          pairing: {
            id: pairing.id,
            changes: {
              player1Wins: pairing.player1Wins,
              player2Wins: pairing.player2Wins,
              draws: pairing.draws,
              submitted: pairing.submitted
            }
          }
        }))
      )
    )
  ));

  private nextId = 1;

  constructor(
    private actions$: Actions,
    private pairingsService: PairingService,
    private roundStorageService: RoundStorageService,
    private storageService: PairingStorageService,
    private store: Store<fromSwiss.State>
  ) {}

  ngrxOnInitEffects() {
    return PairingsApiActions.loadPairings();
  }
}
