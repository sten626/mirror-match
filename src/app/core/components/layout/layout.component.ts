import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'mm-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isMobile$: Observable<boolean>;

  constructor(breakpointObserver: BreakpointObserver) {
    this.isMobile$ = breakpointObserver.observe(Breakpoints.Handset).pipe(
      map(state => state.matches)
    );
  }

  ngOnInit() {
  }

}
