import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import { RoundService } from '../shared';

@Injectable()
export class TournamentStartedGuard implements CanActivate {
  constructor(
    private roundService: RoundService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.roundService.hasBegunTournament.pipe(map((hasBegun: boolean) => {
      if (hasBegun) {
        return true;
      }

      this.router.navigate(['/swiss/players']);
      return false;
    }));
  }
}
