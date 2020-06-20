import { Injectable } from '@angular/core';
import { TournamentApiActions } from '@app/core/actions';
import { PodsStorageService } from '@app/core/services';
import { DraftPodService } from '@app/core/services/draft-pod.service';
import { PodsApiActions, PodsPageActions } from '@app/pods/actions';
import { Pod } from '@app/shared/models';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class PodEffects {
  createPods$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TournamentApiActions.createDraftPods),
      switchMap(({ activePlayerIds }) =>
        this.draftPodService.buildPods(activePlayerIds)
      ),
      switchMap((pods) =>
        this.storageService.setPods(pods).pipe(
          map(() => PodsApiActions.setPodsSuccess({ pods })),
          catchError((error) => of(PodsApiActions.setPodsFailure({ error })))
        )
      )
    )
  );

  loadPods$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PodsPageActions.enter),
      switchMap(() =>
        this.storageService.getPods().pipe(
          map((pods: Pod[]) => PodsApiActions.loadPodsSuccess({ pods })),
          catchError((error) => of(PodsApiActions.loadPodsFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private draftPodService: DraftPodService,
    private storageService: PodsStorageService
  ) {}
}
