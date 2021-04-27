import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlayersPageActions } from '@mm/players/actions';
import * as fromRoot from '@mm/reducers';
import { Player } from '@mm/shared/models';
import { AlertDialogComponent, AlertDialogData } from '@mm/shared/molecules';
import { Update } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'mm-players-page',
  templateUrl: './players-page.component.html',
  styleUrls: ['./players-page.component.scss']
})
export class PlayersPageComponent {
  players$: Observable<Player[]>;

  constructor(private dialog: MatDialog, private store: Store<fromRoot.State>) {
    this.players$ = this.store.pipe(select(fromRoot.selectAllPlayers));
  }

  deleteAllPlayers() {
    const data: AlertDialogData = {
      title: 'Delete all players?',
      content: 'This will delete all registered players and cannot be undone.',
      confirmButtonText: 'Delete All'
    };
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data,
      autoFocus: false,
      scrollStrategy: new NoopScrollStrategy()
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(PlayersPageActions.clearPlayers());
      }
    });
  }

  onCreatePlayer(player: Player) {
    this.store.dispatch(PlayersPageActions.addPlayer({ player }));
  }

  onChangePlayer(update: Update<Player>) {
    this.store.dispatch(PlayersPageActions.updatePlayer({ update }));
  }

  onDeletePlayer(id: number) {
    this.store.dispatch(PlayersPageActions.deletePlayer({ id }));
  }
}
