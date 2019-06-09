import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Round, RoundStorageService } from 'app/shared';
import { PairingsPageActions, PlayersPageActions, RoundApiActions } from 'app/swiss/actions';
import { combineLatest, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

@Injectable()
export class RoundEffects implements OnInitEffects {
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

  // @Effect()
  // redoMatches$: Observable<Action> = this.actions$.pipe(
  //   ofType(PairingsPageActions.PairingsPageActionTypes.RedoMatches),
  //   map(action => action.payload),
  //   map(roundId => ({
  //     id: roundId,
  //     pairings: []
  //   })),
  //   mergeMap((round: Round) =>
  //     this.storageService.updateRound(round).pipe(
  //       map(() => new RoundApiActions.UpdateRoundSuccess({
  //         id: round.id,
  //         changes: {
  //           pairings: round.pairings
  //         }
  //       })),
  //       catchError(err => of(new RoundApiActions.UpdateRoundFailure(err)))
  //     )
  //   )
  // );

  constructor(
    private actions$: Actions<
      PairingsPageActions.PairingsPageActionsUnion
      | PlayersPageActions.PlayersPageActionsUnion
      | RoundApiActions.RoundApiActionsUnion
    >,
    private router: Router,
    private storageService: RoundStorageService
  ) {}

  ngrxOnInitEffects(): Action {
    return new RoundApiActions.LoadRounds();
  }
}
