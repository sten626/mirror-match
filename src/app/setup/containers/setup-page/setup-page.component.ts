import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as fromRoot from '@app/reducers';
import { Player } from '@app/shared/models';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PlayerEditDialogComponent } from '@app/setup/components';

@Component({
  selector: 'mm-setup-page',
  templateUrl: './setup-page.component.html',
  styleUrls: ['./setup-page.component.scss']
})
export class SetupPageComponent {
  players$: Observable<Player[]>;

  constructor(
    private dialog: MatDialog,
    private store: Store<fromRoot.State>
  ) {
    this.players$ = this.store.pipe(
      select(fromRoot.getAllPlayers)
    );
  }

  onEditPlayer(player: Player) {
    this.dialog.open(PlayerEditDialogComponent, {
      data: {
        player: player
      }
    });
  }
}
