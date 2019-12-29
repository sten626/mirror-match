import { Component } from '@angular/core';
import * as fromRoot from '@app/reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'mm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  pageHeader: string;
  showSidenav$: Observable<boolean>;

  // private urlSubscription: Subscription;

  constructor(
    private store: Store<fromRoot.State>
  ) {
    this.showSidenav$ = this.store.select(fromRoot.selectShowSidenav);
  }
}
