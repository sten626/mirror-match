import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TournamentApiActions } from '@app/core/actions';
import { TournamentStorageService } from '@app/core/services/tournament-storage.service';
import { SetupPageActions } from '@app/setup/actions';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap, switchMap } from 'rxjs/operators';

@Injectable()
export class TournamentEffects implements OnInitEffects {
  loadTournament$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TournamentApiActions.loadTournament),
      switchMap(() =>
        this.storageService.getTournamentInfo().pipe(
          map((tournamentInfo) =>
            TournamentApiActions.loadTournamentSuccess({ tournamentInfo })
          ),
          catchError((err) =>
            of(TournamentApiActions.loadTournamentFailure({ err }))
          )
        )
      )
    )
  );

  setTournamentInfoSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TournamentApiActions.setTournamentInfoSuccess),
        tap(({ tournamentInfo }) => {
          if (tournamentInfo.isDraft) {
            this.router.navigate(['/pods']);
          } else {
            this.router.navigate(['/pairings']);
          }
        })
      ),
    { dispatch: false }
  );

  startTournament$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SetupPageActions.startTournament),
      mergeMap(({ tournamentInfo }) =>
        this.storageService.setTournamentInfo(tournamentInfo).pipe(
          map(() =>
            TournamentApiActions.setTournamentInfoSuccess({ tournamentInfo })
          ),
          catchError((err) =>
            of(TournamentApiActions.setTournamentInfoFailure({ err }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private storageService: TournamentStorageService
  ) {}

  ngrxOnInitEffects() {
    return TournamentApiActions.loadTournament();
  }
}
