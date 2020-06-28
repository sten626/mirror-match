import { Injectable } from '@angular/core';
import { PodsStorageService } from '@app/core/services';
import { DraftPodService } from '@app/core/services/draft-pod.service';
import { PodsApiActions, PodsPageActions } from '@app/pods/actions';
import * as fromRoot from '@app/reducers';
import { Pod } from '@app/shared/models';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  switchMap,
  withLatestFrom
} from 'rxjs/operators';

@Injectable()
export class PodEffects {
  createDraftPods$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PodsApiActions.createDraftPods),
      concatMap((action) =>
        of(action).pipe(
          withLatestFrom(this.store.pipe(select(fromRoot.selectActivePlayerIds)))
        )
      ),
      switchMap(([_, activePlayerIds]) =>
        this.draftPodService.buildPods(activePlayerIds).pipe(
          map((pods) => PodsApiActions.createDraftPodsSuccess({ pods })),
          catchError((error) =>
            of(PodsApiActions.createDraftPodsFailure({ error }))
          )
        )
      )
    )
  );

  loadPods$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PodsPageActions.enter),
      switchMap(() =>
        this.storageService.getPods().pipe(
          map((pods: Pod[]) => {
            if (pods.length > 0) {
              return PodsApiActions.loadPodsSuccess({ pods });
            }

            return PodsApiActions.createDraftPods();
          }),
          catchError((error) => of(PodsApiActions.loadPodsFailure({ error })))
        )
      )
    )
  );

  setDraftPods$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PodsApiActions.createDraftPodsSuccess),
      switchMap(({ pods }) =>
        this.storageService.setPods(pods).pipe(
          map(() => PodsApiActions.setDraftPodsSuccess({ pods })),
          catchError((error) =>
            of(PodsApiActions.setDraftPodsFailure({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private draftPodService: DraftPodService,
    private storageService: PodsStorageService,
    private store: Store<fromRoot.State>
  ) {}
}
