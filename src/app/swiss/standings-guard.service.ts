import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { RoundService } from '../shared';

@Injectable()
export class StandingsGuard implements CanActivate {
  constructor(
    private roundService: RoundService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.roundService.hasCompletedRounds.map((hasCompletedRounds: boolean) => {
      if (hasCompletedRounds) {
        return true;
      }

      this.router.navigate(['/swiss/pairings']);
      return false;
    });
  }
}
