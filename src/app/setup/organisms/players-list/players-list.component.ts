import { Component, Input, OnInit } from '@angular/core';
import { playerListAnimations } from '@mm/setup/organisms/players-list/player-list-animations';
import { Player } from '@mm/shared/models';

@Component({
  selector: 'mm-players-list',
  animations: playerListAnimations,
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent implements OnInit {
  @Input() players: Player[];

  initialPlayers: Set<Player>;

  constructor() {}

  ngOnInit() {
    this.initialPlayers = new Set(this.players);
  }
}
