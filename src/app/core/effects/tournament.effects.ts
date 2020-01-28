import { Injectable } from '@angular/core';
import { TournamentApiActions } from '@app/core/actions';
import { TournamentStorageService } from '@app/core/services/tournament-storage.service';
import { SetupPageActions } from '@app/setup/actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { combineLatest, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TournamentEffects {
  startTournamentSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(TournamentApiActions.startTournamentSuccess),
    tap(({isDraft}) => {
      if (isDraft) {
        this.router.navigate(['/pods']);
      } else {
        this.router.navigate(['/pairings']);
      }
    })
  ), { dispatch: false });

  startTournament$ = createEffect(() => this.actions$.pipe(
    ofType(SetupPageActions.startTournament),
    mergeMap(({bestOf, isDraft, totalRounds}) => {
      const setBestOf$ = this.storageService.setBestOf(bestOf);
      const setIsDraft$ = this.storageService.setIsDraft(isDraft);
      const setTotalRounds$ = this.storageService.setTotalRounds(totalRounds);

      return combineLatest(setBestOf$, setIsDraft$, setTotalRounds$).pipe(
        map(() => TournamentApiActions.startTournamentSuccess({bestOf, isDraft, totalRounds})),
        catchError(err => of(TournamentApiActions.startTournamentFailure(err)))
      );
    })
  ));

  constructor(
    private actions$: Actions,
    private router: Router,
    private storageService: TournamentStorageService
  ) {}
}
