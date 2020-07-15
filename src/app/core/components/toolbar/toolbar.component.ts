import { Component, Input } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import * as fromRoot from '@app/reducers';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'mm-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input() color: ThemePalette;

  hasAnythingStarted$: Observable<boolean>;
  hasDraftStarted$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>) {
    this.hasAnythingStarted$ = this.store.pipe(
      select(fromRoot.hasAnythingStarted)
    );

    this.hasDraftStarted$ = this.store.pipe(select(fromRoot.hasDraftStarted));
  }
}
