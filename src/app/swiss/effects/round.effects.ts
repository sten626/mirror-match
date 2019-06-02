import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { RoundStorageService, Round } from 'app/shared';
import { PlayersPageActions, RoundApiActions } from 'app/swiss/actions';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';

@Injectable()
export class RoundEffects {
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

  constructor(
    private actions$: Actions<PlayersPageActions.PlayersPageActionsUnion | RoundApiActions.RoundApiActionsUnion>,
    private router: Router,
    private storageService: RoundStorageService
  ) {}
}
