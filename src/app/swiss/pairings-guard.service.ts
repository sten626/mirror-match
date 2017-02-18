import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { PairingsService } from '../shared';

@Injectable()
export class PairingsGuard implements CanActivate {
  constructor(
    private pairingsService: PairingsService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.pairingsService.begunPairings) {
      return true;
    }

    this.router.navigate(['/swiss/players']);
    return false;
  }
}
