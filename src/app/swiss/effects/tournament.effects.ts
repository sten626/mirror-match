import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { PlayersPageActions, TournamentApiActions } from '../actions';

@Injectable()
export class TournamentEffects {
  @Effect()
  beginEvent$: Observable<Action> = this.actions$.pipe(
    ofType(PlayersPageActions.PlayerPageActionTypes.BeginEvent),
    map(action => action.payload),
    mergeMap(numOfRounds => {
      localStorage.setItem('numberOfRounds', JSON.stringify(numOfRounds));
      localStorage.setItem('currentRound', '1');
      return of(new TournamentApiActions.BeginEventSuccess(numOfRounds));
    }),
    tap(() => this.router.navigate(['/swiss/pairings']))
  );

  @Effect()
  loadTournament$: Observable<Action> = this.actions$.pipe(
    ofType(PlayersPageActions.PlayerPageActionTypes.LoadTournament),
    switchMap(() => {
      const numOfRounds = JSON.parse(localStorage.getItem('numberOfRounds'));
      const currentRound = JSON.parse(localStorage.getItem('currentRound'));
      return of(new TournamentApiActions.LoadTournamentSuccess({
        currentRound: currentRound,
        numberOfRounds: numOfRounds
      }));
    })
  );

  constructor(
    private actions$: Actions<PlayersPageActions.PlayersPageActionsUnion>,
    private router: Router
  ) {}
}
