import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { PairingsService } from '../shared';

@Injectable()
export class PairingsGuard implements CanActivate {
  constructor(
    private pairingsService: PairingsService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.pairingsService.hasBegunPairings().map(result => {
      if (result) {
        return true;
      }

      this.router.navigate(['/swiss/players']);
      return false;
    });
  }
}
