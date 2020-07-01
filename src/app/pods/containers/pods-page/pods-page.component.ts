import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { PodsPageActions } from '@app/pods/actions';
import * as fromPods from '@app/pods/reducers';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'mm-pods-page',
  templateUrl: './pods-page.component.html',
  styleUrls: ['./pods-page.component.scss']
})
export class PodsPageComponent implements OnInit {
  isHandset$: Observable<boolean>;
  pods$: Observable<string[][]>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<fromPods.State>
  ) {
    this.isHandset$ = this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(map((result) => result.matches));
    this.pods$ = this.store.pipe(select(fromPods.selectPodPlayerNames));
  }

  ngOnInit(): void {
    this.store.dispatch(PodsPageActions.enter());
  }
}
