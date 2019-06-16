import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable()
export class StandingsGuard implements CanActivate {
  constructor(
    // private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return of(true);
  //   return this.roundService.hasCompletedRounds$.pipe(map((hasCompletedRounds: boolean) => {
  //     if (hasCompletedRounds) {
  //       return true;
  //     }

  //     this.router.navigate(['/swiss/pairings']);
  //     return false;
  //   }));
  }
}
