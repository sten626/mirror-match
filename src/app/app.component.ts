import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from 'app/reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'mm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  mediaQueryList: MediaQueryList;
  test: Observable<string>;

  private mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, store: Store<fromRoot.State>) {
    this.mediaQueryList = media.matchMedia('(min-width: 960px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mediaQueryList.addListener(this.mobileQueryListener);
    this.test = store.select(fromRoot.selectCurrentRoute);
  }

  ngOnDestroy() {
    this.mediaQueryList.removeListener(this.mobileQueryListener);
  }
}
