import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as fromRoot from '@app/reducers';
import { PlayerEditDialogComponent } from '@app/setup/components';
import { Player } from '@app/shared/models';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SetupPageActions } from '@app/setup/actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'mm-setup-page',
  templateUrl: './setup-page.component.html',
  styleUrls: ['./setup-page.component.scss']
})
export class SetupPageComponent {
  canBeginTournament$: Observable<boolean>;
  players$: Observable<Player[]>;

  constructor(
    private dialog: MatDialog,
    private store: Store<fromRoot.State>
  ) {
    this.canBeginTournament$ = this.store.pipe(
      select(fromRoot.canBeginTournament)
    );

    this.players$ = this.store.pipe(
      select(fromRoot.getAllPlayers),
      map(players => players.slice().reverse())
    );
  }

  onAddPlayer(name: string) {
    const player: Player = {
      id: null,
      name: name,
      dropped: false
    };
    this.store.dispatch(SetupPageActions.addPlayer({player}));
  }

  onEditPlayer(event: {player: Player, otherPlayers: Player[]}) {
    const {player, otherPlayers} = event;
    const dialogRef = this.dialog.open(PlayerEditDialogComponent, {
      data: {
        player: player,
        otherPlayers: otherPlayers
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const {name, dropped} = result;

        if (dropped) {
          // TODO Check if tournament has started or not.
          this.store.dispatch(SetupPageActions.deletePlayer({
            id: player.id
          }));
        } else {
          this.store.dispatch(SetupPageActions.updatePlayer({
            player: {
              id: player.id,
              changes: {name}
            }
          }));
        }
      }
    });
  }
}
