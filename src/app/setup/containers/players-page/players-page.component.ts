import { Component } from '@angular/core';
import * as fromRoot from '@app/reducers';
import { PlayersPageActions } from '@app/setup/actions';
import { Player } from '@app/shared/models';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './players-page.component.html'
})
export class PlayersPageComponent {
  players$: Observable<Player[]>;

  constructor(
    private store: Store<fromRoot.State>
  ) {
    this.players$ = store.pipe(
      select(fromRoot.getAllPlayers)
    );
  }

  onAddPlayer(playerName: string) {
    if (playerName) {
      const player: Player = {
        id: null,
        name: playerName,
        dropped: false
      };

      this.store.dispatch(PlayersPageActions.addPlayer({player}));
    }
  }
}
