import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mm-players-page',
  templateUrl: './players-page.component.html',
  styleUrls: ['./players-page.component.scss']
})
export class PlayersPageComponent implements OnDestroy, OnInit {
  breakpointSub: Subscription;
  isXSmallDisplay = false;

  constructor(private breakpointObserver: BreakpointObserver) {}

  @HostBinding('class.xsmall') get xsmall() {
    return this.isXSmallDisplay;
  }

  ngOnInit() {
    this.breakpointSub = this.breakpointObserver
      .observe(Breakpoints.XSmall)
      .subscribe((result) => {
        this.isXSmallDisplay = result.matches;
      });
  }

  ngOnDestroy() {
    this.breakpointSub.unsubscribe();
  }
}
