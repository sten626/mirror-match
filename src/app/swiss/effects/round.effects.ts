import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';
import { Pairing, PairingService, Round, RoundStorageService } from 'app/shared';
import { PairingsPageActions, PlayersPageActions, RoundApiActions } from 'app/swiss/actions';
import * as fromSwiss from 'app/swiss/reducers';
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
  createFirstRound$: Observable<Action> = this.actions$.pipe(
    ofType(RoundApiActions.RoundApiActionTypes.BeginEventSuccess),
    map(() => ({
      id: 1,
      pairings: []
    })),
    mergeMap((round: Round) =>
      this.storageService.addRound(round).pipe(
        map(value => new RoundApiActions.CreateRoundSuccess(value)),
        catchError(err => of(new RoundApiActions.CreateRoundFailure(err)))
      )
    )
  );

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
        mergeMap(([isLastRound, players]) => this.pairingsService.createPairings(round, isLastRound, players)),
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

  constructor(
    private actions$: Actions<
      PairingsPageActions.PairingsPageActionsUnion
      | PlayersPageActions.PlayersPageActionsUnion
      | RoundApiActions.RoundApiActionsUnion
    >,
    private pairingsService: PairingService,
    private router: Router,
    private storageService: RoundStorageService,
    private store: Store<fromSwiss.State>
  ) {}

  ngrxOnInitEffects(): Action {

  }
}
