import { Injectable } from '@angular/core';
import { PodsStorageService } from '@app/core/services';
import { PodsApiActions, PodsPageActions } from '@app/pods/actions';
import { Pod } from '@app/shared/models';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class PodEffects {
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
    private storageService: PodsStorageService
  ) {}
}
