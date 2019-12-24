import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import * as fromRoot from '@app/reducers';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'mm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy, OnInit {
  mediaQueryList: MediaQueryList;
  pageHeader: string;
  showSidenav$: Observable<boolean>;

  private mobileQueryListener: () => void;
  private urlSubscription: Subscription;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private store: Store<fromRoot.State>
  ) {
    this.mediaQueryList = media.matchMedia('(min-width: 960px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mediaQueryList.addListener(this.mobileQueryListener);
    this.showSidenav$ = this.store.select(fromRoot.selectShowSidenav);
  }

  ngOnInit() {
    this.urlSubscription = this.store.select(fromRoot.selectUrl).subscribe(route => {
      if (route && route.includes('/')) {
        const routeSection = route.split('/')[1];
        this.pageHeader = routeSection[0].toUpperCase() + routeSection.slice(1);
      } else {
        this.pageHeader = '';
      }
    });
  }

  ngOnDestroy() {
    this.mediaQueryList.removeListener(this.mobileQueryListener);
    this.urlSubscription.unsubscribe();
  }
}
