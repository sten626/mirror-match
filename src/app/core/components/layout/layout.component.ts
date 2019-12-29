import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mm-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnDestroy, OnInit {
  isMobile: boolean;

  private breakpointSub: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit() {
    this.breakpointSub = this.breakpointObserver.observe(Breakpoints.Handset).subscribe(state => {
      this.isMobile = state.matches;
    });
  }

  ngOnDestroy() {
    this.breakpointSub.unsubscribe();
  }
}
