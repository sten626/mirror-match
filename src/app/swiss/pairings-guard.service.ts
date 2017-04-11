import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { RoundService } from '../shared';

@Injectable()
export class PairingsGuard implements CanActivate {
  constructor(
    private roundService: RoundService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.roundService.hasBegunTournament.map((hasBegun: boolean) => {
      if (hasBegun) {
        return true;
      }

      this.router.navigate(['/swiss/players']);
      return false;
    });
  }
}
