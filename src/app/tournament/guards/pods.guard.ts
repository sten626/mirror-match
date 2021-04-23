import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PodsGuard implements CanActivate {
  constructor() {}

  canActivate(): Observable<boolean> {
    return of(true);
    // return this.store.pipe(
    //   select(fromRoot.hasDraftStarted),
    //   map((isDraft) => {
    //     if (!isDraft) {
    //       this.router.navigate(['/']);
    //       return false;
    //     }

    //     return true;
    //   })
    // );
  }
}
