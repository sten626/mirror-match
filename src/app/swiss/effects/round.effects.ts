import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageActions } from '@mm/core/actions';
import { RoundStorageService } from '@mm/core/services';
import { Message, MessageType, Round } from '@mm/shared/models';
import { PairingsApiActions, PairingsPageActions, PlayersPageActions, RoundApiActions } from '@mm/swiss/actions';
import * as fromSwiss from '@mm/swiss/reducers';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';

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

  checkIfRoundCompleted$ = createEffect(() => this.actions$.pipe(
    ofType(PairingsApiActions.submitResultSuccess),
    withLatestFrom(
      this.store.pipe(
        select(fromSwiss.getSelectedRoundPairingsOutstandingTotal),
      ),
      this.store.pipe(
        select(fromSwiss.getSelectedRoundId)
      ),
      this.store.pipe(
        select(fromSwiss.getNumberOfRounds)
      )
    ),
    tap(([_, outstandingPairingsTotal, selectedRoundId, numberOfRounds]) => {
      if (outstandingPairingsTotal === 0) {
        this.store.dispatch(RoundApiActions.roundCompleted({roundId: selectedRoundId}));

        if (selectedRoundId === numberOfRounds) {
          const message: Message = {
            text: 'Last round complete. Final standings are posted.',
            type: MessageType.Success
          };
          this.store.dispatch(MessageActions.addMessage({message}));
        }
      }
    })
  ), {dispatch: false});

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

  createNextRound$ = createEffect(() => this.actions$.pipe(
    ofType(PairingsPageActions.createNextRound),
    withLatestFrom(this.store.pipe(
      select(fromSwiss.getTotalRounds)
    )),
    map(([_, totalRounds]) => ({
      id: totalRounds + 1,
      pairingIds: []
    }) as Round),
    mergeMap(round =>
      this.storageService.addRound(round).pipe(
        map(() => RoundApiActions.addRound({round}))
      )
    )
  ));

  loadRounds$ = createEffect(() => this.actions$.pipe(
    ofType(RoundApiActions.loadRounds),
    switchMap(() => {
      const rounds$ = this.storageService.getRounds();
      const numberOfRounds$ = this.storageService.getNumberOfRounds();
      const selectedRoundId$ = this.storageService.getSelectedRound();
      const completedRoundId$ = this.storageService.getCompletedRound();

      return combineLatest(rounds$, numberOfRounds$, selectedRoundId$, completedRoundId$);
    }),
    map(([rounds, numberOfRounds, selectedRoundId, completedRoundId]) =>
      RoundApiActions.loadRoundsSuccess({numberOfRounds, rounds, selectedRoundId, completedRoundId})
    )
  ));

  navigateToStandingsPage = createEffect(() => this.actions$.pipe(
    ofType(RoundApiActions.setCompletedRoundSuccess),
    tap(() => this.router.navigate(['/swiss/standings']))
  ), {dispatch: false});

  setCompletedRound$ = createEffect(() => this.actions$.pipe(
    ofType(RoundApiActions.roundCompleted),
    mergeMap(({roundId}) =>
      this.storageService.setCompletedRound(roundId).pipe(
        map(() => RoundApiActions.setCompletedRoundSuccess({roundId}))
      )
    )
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
