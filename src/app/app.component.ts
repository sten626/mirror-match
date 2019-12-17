import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'mm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  mediaQueryList: MediaQueryList;

  private mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mediaQueryList = media.matchMedia('(min-width: 960px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mediaQueryList.addListener(this.mobileQueryListener);
  }

  ngOnDestroy() {
    this.mediaQueryList.removeListener(this.mobileQueryListener);
  }
}
