import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { PairingService } from '../shared';

@Injectable()
export class PairingsGuard implements CanActivate {
  constructor(
    private pairingService: PairingService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.pairingService.hasBegunPairings().map(result => {
      if (result) {
        return true;
      }

      this.router.navigate(['/swiss/players']);
      return false;
    });
  }
}
