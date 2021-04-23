import { Component, HostBinding } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'mm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  hasAnythingStarted$: Observable<boolean>;
  isMobile$: Observable<boolean>;

  constructor() {}

  @HostBinding('class.mat-typography') typography = true;
}
