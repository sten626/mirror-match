import { Component, OnInit } from '@angular/core';
import { PodsPageActions } from '@app/pods/actions';
import * as fromPods from '@app/pods/reducers';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'mm-pods-page',
  templateUrl: './pods-page.component.html'
})
export class PodsPageComponent implements OnInit {
  pods$: Observable<string[][]>;

  constructor(private store: Store<fromPods.State>) {
    this.pods$ = this.store.pipe(select(fromPods.selectPodPlayerNames));
  }

  ngOnInit(): void {
    this.store.dispatch(PodsPageActions.enter());
  }
}
