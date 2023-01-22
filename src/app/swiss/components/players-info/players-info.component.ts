import { Component, Input } from '@angular/core';

@Component({
  selector: 'mm-players-info',
  templateUrl: './players-info.component.html',
})
export class PlayersInfoComponent {
  @Input() activePlayers: number = 0;
  @Input() droppedPlayers: number = 0;
  @Input() totalPlayers: number = 0;
}
