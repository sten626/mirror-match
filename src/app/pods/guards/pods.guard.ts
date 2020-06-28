import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import * as fromPods from '@app/pods/reducers';
import * as fromRoot from '@app/reducers';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PodsGuard implements CanActivate {
  constructor(private router: Router, private store: Store<fromPods.State>) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(fromRoot.isDraft),
      map((isDraft) => {
        if (!isDraft) {
          this.router.navigate(['/']);
          return false;
        }

        return true;
      })
    );
  }
}
