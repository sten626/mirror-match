import { Component } from '@angular/core';

@Component({
  templateUrl: 'app/players/players.component.html'
})
export class PlayersComponent {
  numberOfRounds = 3;
  playerName: string;
}
