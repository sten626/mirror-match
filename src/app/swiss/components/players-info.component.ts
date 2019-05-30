import { Component, Input } from '@angular/core';

@Component({
  selector: 'mm-players-info',
  templateUrl: './players-info.component.html'
})
export class PlayersInfoComponent {
  @Input() activePlayers: number;
  @Input() droppedPlayers: number;
  @Input() totalPlayers: number;
}
