import { Injectable } from '@angular/core';
import { TournamentApiActions } from '@app/core/actions';
import { TournamentStorageService } from '@app/core/services/tournament-storage.service';
import { SetupPageActions } from '@app/setup/actions';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';



@Injectable()
export class TournamentEffects {
  updateBestOf$ = createEffect(() => this.actions$.pipe(
    ofType(SetupPageActions.startTournament),
    mergeMap(({bestOf, isDraft, totalRounds}) =>
      this.storageService.setBestOf(bestOf).pipe(
        map(() => TournamentApiActions.updateBestOfSuccess({bestOf})),
        catchError(err => of(TournamentApiActions.updateBestOfFailure(err)))
      )
    )
  ));


  constructor(
    private actions$: Actions,
    private storageService: TournamentStorageService
  ) {}

}
