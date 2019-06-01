import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { TournamentInfo, TournamentStorageService } from 'app/shared';
import { PlayersPageActions, TournamentApiActions, PairingsPageActions } from 'app/swiss/actions';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';

@Injectable()
export class TournamentEffects implements OnInitEffects {
  @Effect()
  beginEvent$: Observable<Action> = this.actions$.pipe(
    ofType(PlayersPageActions.PlayerPageActionTypes.BeginEvent),
    map(action => action.payload),
    map(numberOfRounds => {
      return {
        currentRound: 1,
        numberOfRounds: numberOfRounds
      };
    }),
    mergeMap((tournamentInfo: TournamentInfo) =>
      this.storageService.setTournamentInfo(tournamentInfo).pipe(
        map(() => new TournamentApiActions.BeginEventSuccess(tournamentInfo.numberOfRounds)),
        catchError((err) => {
          console.error(err);
          return of(new TournamentApiActions.BeginEventFailure());
        })
      )
    ),
    tap(() => this.router.navigate(['/swiss/pairings']))
  );

  @Effect()
  changeSelectedRound$: Observable<Action> = this.actions$.pipe(
    ofType(PairingsPageActions.PairingsPageActionTypes.ChangeSelectedRound),
    map(action => action.payload),
    mergeMap(round =>
      this.storageService.setSelectedRound(round).pipe(
        map(() => new TournamentApiActions.SetSelectedRoundSuccess(round)),
        catchError(err => of(new TournamentApiActions.SetSelectedRoundFailure(err)))
      )
    )
  );

  @Effect()
  loadTournament$: Observable<Action> = this.actions$.pipe(
    ofType(TournamentApiActions.TournamentApiActionTypes.LoadTournament),
    switchMap(() =>
      this.storageService.getTournamentInfo().pipe(
        map((tournamentInfo: TournamentInfo) => new TournamentApiActions.LoadTournamentSuccess(tournamentInfo)),
        catchError((err) => of(new TournamentApiActions.LoadTournamentFailure(err)))
      )
    )
  );

  constructor(
    private actions$: Actions<PlayersPageActions.PlayersPageActionsUnion | PairingsPageActions.PairingsPageActionsUnion>,
    private router: Router,
    private storageService: TournamentStorageService
  ) {}

  ngrxOnInitEffects() {
    return new TournamentApiActions.LoadTournament();
  }
}
