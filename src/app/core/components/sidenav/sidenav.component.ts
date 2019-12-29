import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'mm-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnDestroy, OnInit {
  isMobile = true;
  breakpointState$: Observable<BreakpointState>;
  // mediaQueryList: MediaQueryList;

  // private mobileQueryListener: () => void;

  constructor(
    breakpointObserver: BreakpointObserver)
  {
    this.breakpointState$ = breakpointObserver.observe(Breakpoints.Handset);
    this.isMobile = breakpointObserver.isMatched(Breakpoints.Handset);
    // this.mediaQueryList = media.matchMedia('(min-width: 960px)');
    // this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    // this.mediaQueryList.addListener(this.mobileQueryListener);
  }

  ngOnInit() {
    this.breakpointState$.subscribe(state => {
      this.isMobile = state.matches;
      console.log(state.matches);
    });
  }

  ngOnDestroy() {
    // this.mediaQueryList.removeListener(this.mobileQueryListener);
  }
}
