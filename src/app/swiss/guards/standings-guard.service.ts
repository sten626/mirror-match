import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as fromSwiss from 'app/swiss/reducers';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class StandingsGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<fromSwiss.State>
  ) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(fromSwiss.getCompletedRoundId),
      map(completedRoundId => {
        if (completedRoundId) {
          return true;
        }

        this.router.navigate(['/swiss']);
        return false;
      })
    );
  }
}
