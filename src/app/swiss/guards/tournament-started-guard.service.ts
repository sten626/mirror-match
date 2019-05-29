import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, filter, take, switchMap } from 'rxjs/operators';
import * as fromSwiss from '../reducers';

@Injectable()
export class TournamentStartedGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<fromSwiss.State>
  ) {}

  canActivate(): Observable<boolean> {
    return this.waitForTournamentToLoad().pipe(
      switchMap(() => this.hasTournamentStarted().pipe(
        map((hasBegun: boolean) => {
          if (hasBegun) {
            return true;
          }

          this.router.navigate(['/swiss']);
          return false;
        })
      ))
    );
  }

  private hasTournamentStarted(): Observable<boolean> {
    return this.store.pipe(
      select(fromSwiss.hasTournamentStarted)
    );
  }

  private waitForTournamentToLoad(): Observable<boolean> {
    return this.store.pipe(
      select(fromSwiss.isTournamentLoaded),
      filter(loaded => loaded),
      take(1)
    );
  }
}
