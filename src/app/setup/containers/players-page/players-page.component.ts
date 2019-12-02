import { Component } from '@angular/core';
import * as fromRoot from '@app/reducers';
import { PlayersPageActions } from '@app/setup/actions';
import { Player } from '@app/shared/models';
import { Store } from '@ngrx/store';

@Component({
  templateUrl: './players-page.component.html'
})
export class PlayersPageComponent {
  constructor(
    private store: Store<fromRoot.State>
  ) {}

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
