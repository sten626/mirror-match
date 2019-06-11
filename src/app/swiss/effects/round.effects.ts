import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, State, select } from '@ngrx/store';
import { PairingStorageService, Round, RoundStorageService } from 'app/shared';
import { PairingsApiActions, PairingsPageActions, PlayersPageActions, RoundApiActions } from 'app/swiss/actions';
import * as fromSwiss from 'app/swiss/reducers';
import { combineLatest, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

@Injectable()
export class RoundEffects implements OnInitEffects {
  @Effect()
  addPairings$: Observable<Action> = this.actions$.pipe(
    ofType(PairingsApiActions.PairingsApiActionTypes.CreatePairingsSuccess),
    map(action => action.payload),
    mergeMap(({roundId, pairings}) => {
      const updateRound$ = this.storageService.updateRound({
        id: roundId,
        pairingIds: pairings.map(pairing => pairing.id)
      });
      const addPairingsResult$ = this.pairingStorageService.addPairings(pairings);

      return combineLatest(updateRound$, addPairingsResult$).pipe(
        map(() => new RoundApiActions.AddPairingsSuccess({roundId, pairings})),
        catchError(err => of(new RoundApiActions.AddPairingsFailure(err)))
      );
    })
  );

  @Effect()
  beginEvent$: Observable<Action> = this.actions$.pipe(
    ofType(PlayersPageActions.PlayerPageActionTypes.BeginEvent),
    map(action => action.payload),
    mergeMap(numberOfRounds =>
      this.storageService.setNumberOfRounds(numberOfRounds).pipe(
        map(() => new RoundApiActions.BeginEventSuccess(numberOfRounds)),
        catchError(err => of(new RoundApiActions.BeginEventFailure(err)))
      )
    ),
    tap(() => this.router.navigate(['/swiss/pairings']))
  );

  @Effect()
  changeSelectedRound$: Observable<Action> = this.actions$.pipe(
    ofType(PairingsPageActions.PairingsPageActionTypes.ChangeSelectedRound),
    map(action => action.payload),
    mergeMap(roundId =>
      this.storageService.setSelectedRound(roundId).pipe(
        map(() => new RoundApiActions.SelectRoundSuccess(roundId)),
        catchError(err => of(new RoundApiActions.SelectRoundFailure(err)))
      )
    )
  );

  // @Effect()
  // clearMatchResult$: Observable<Action> = this.actions$.pipe(
  //   ofType(PairingsPageActions.PairingsPageActionTypes.ClearMatchResult),
  //   map(action => action.payload),
  //   mergeMap(pairing =>)
  // );

  @Effect()
  createFirstRound$: Observable<Action> = this.actions$.pipe(
    ofType(RoundApiActions.RoundApiActionTypes.BeginEventSuccess),
    map(() => ({
      id: 1,
      pairingIds: []
    })),
    mergeMap((round: Round) =>
      this.storageService.addRound(round).pipe(
        map(value => new RoundApiActions.CreateRoundSuccess(value)),
        catchError(err => of(new RoundApiActions.CreateRoundFailure(err)))
      )
    )
  );

  @Effect()
  loadRounds$: Observable<Action> = this.actions$.pipe(
    ofType(RoundApiActions.RoundApiActionTypes.LoadRounds),
    mergeMap(() => {
      const rounds$ = this.storageService.getRounds();
      const numberOfRounds$ = this.storageService.getNumberOfRounds();
      const selectedRound$ = this.storageService.getSelectedRound();

      return combineLatest(rounds$, numberOfRounds$, selectedRound$);
    }),
    map(([rounds, numberOfRounds, selectedRoundId]) => new RoundApiActions.LoadRoundsSuccess({
      rounds: rounds,
      numberOfRounds: numberOfRounds,
      selectedRoundId: selectedRoundId
    })),
    catchError(err => of(new RoundApiActions.LoadRoundsFailure(err)))
  );

  @Effect()
  redoMatches$: Observable<Action> = this.actions$.pipe(
    ofType(PairingsPageActions.PairingsPageActionTypes.xF),
    map(action => action.payload),
    mergeMap((roundId: number) =>
      this.store.pipe(
        select(fromSwiss.getRoundEntities),
        map(roundEntities => roundEntities[roundId].pairingIds),
        mergeMap(pairingIds => {
          const updateRound$ = this.storageService.updateRound({
            id: roundId,
            pairingIds: []
          });
          const deletePairings$ = this.pairingStorageService.deletePairings(pairingIds);

          return combineLatest(updateRound$, deletePairings$).pipe(
            map(() => new RoundApiActions.RedoMatchesSuccess({roundId, pairingIds})),
            catchError(err => of(new RoundApiActions.RedoMatchesFailure(err)))
          );
        })
      )
    )
      // this.storageService.updateRound({
      //   id: roundId,
      //   pairingIds: []
      // }).pipe(
      //   map(() => new RoundApiActions.UpdateRoundSuccess({
      //     id: roundId,
      //     changes: {
      //       pairingIds: []
      //     }
      //   })),
      //   catchError(err => of(new RoundApiActions.UpdateRoundFailure(err)))
      // )
    // )
  );

  constructor(
    private actions$: Actions<
      PairingsApiActions.PairingsApiActionsUnion
      | PairingsPageActions.PairingsPageActionsUnion
      | PlayersPageActions.PlayersPageActionsUnion
      | RoundApiActions.RoundApiActionsUnion
    >,
    private pairingStorageService: PairingStorageService,
    private router: Router,
    private storageService: RoundStorageService,
    private store: State<fromSwiss.State>
  ) {}

  ngrxOnInitEffects(): Action {
    return new RoundApiActions.LoadRounds();
  }
}
