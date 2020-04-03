import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EventInfoPageActions, SwissApiActions } from '@app/swiss/actions';
import { map, tap } from 'rxjs/operators';

/**
 * Effects for the overall Swiss feature state or for multiple slices of it.
 */
@Injectable()
export class SwissEffects {
  clearAllData$ = createEffect(() => this.actions$.pipe(
    ofType(EventInfoPageActions.endEventConfirmed),
    tap(() => localStorage.clear()),
    map(() => SwissApiActions.clearAllDataSuccess()),
    tap(() => this.router.navigate(['/']))
  ));

  constructor(
    private actions$: Actions,
    private router: Router
  ) {}
}
