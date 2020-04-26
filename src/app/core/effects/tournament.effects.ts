import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TournamentApiActions } from '@app/core/actions';
import { TournamentStorageService } from '@app/core/services/tournament-storage.service';
import * as fromRoot from '@app/reducers';
import { SetupPageActions } from '@app/setup/actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { combineLatest, of } from 'rxjs';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { DraftPodService } from '@app/core/services/draft-pod.service';

@Injectable()
export class TournamentEffects {
  startDraft$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SetupPageActions.startDraft),
      withLatestFrom(this.store.pipe(select(fromRoot.getActivePlayerIds))),
      mergeMap(([_, playersIds]) => {
        const pods = this.draftPodService.buildPods(playersIds as number[]);
        return this.storageService.setDraftPods(pods).pipe(
          map(() => TournamentApiActions.startDraftSuccess({pods})),
          catchError(err => of(TournamentApiActions.startDraftFailure({err})))
        );
      }),
    )
  );

  startDraftSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TournamentApiActions.startDraftSuccess),
      tap(() => this.router.navigate(['/pods']))
    ), { dispatch: false }
  );

  startTournamentSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TournamentApiActions.startTournamentSuccess),
        tap(({ isDraft }) => {
          if (isDraft) {
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
      mergeMap(({ bestOf, isDraft, totalRounds }) => {
        const setBestOf$ = this.storageService.setBestOf(bestOf);
        const setIsDraft$ = this.storageService.setIsDraft(isDraft);
        const setTotalRounds$ = this.storageService.setTotalRounds(totalRounds);

        return combineLatest(setBestOf$, setIsDraft$, setTotalRounds$).pipe(
          map(() =>
            TournamentApiActions.startTournamentSuccess({
              bestOf,
              isDraft,
              totalRounds
            })
          ),
          catchError(err =>
            of(TournamentApiActions.startTournamentFailure({ err }))
          )
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private draftPodService: DraftPodService,
    private router: Router,
    private storageService: TournamentStorageService,
    private store: Store<fromRoot.State>
  ) {}
}
