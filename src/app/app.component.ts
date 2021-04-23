import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'mm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {}

  @HostBinding('class.mat-typography') typography = true;
}
