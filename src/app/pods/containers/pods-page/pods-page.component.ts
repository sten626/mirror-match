import { Component, OnInit } from '@angular/core';
import { PodsPageActions } from '@app/pods/actions';
import * as fromPods from '@app/pods/reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'mm-pods-page',
  templateUrl: './pods-page.component.html'
})
export class PodsPageComponent implements OnInit {
  constructor(private store: Store<fromPods.State>) {}

  ngOnInit(): void {
    this.store.dispatch(PodsPageActions.enter());
  }
}
