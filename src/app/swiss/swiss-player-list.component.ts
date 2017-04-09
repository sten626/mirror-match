import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {
  PairingsService,
  Player,
  PlayerService
} from '../shared';

@Component({
  selector: 'mm-swiss-player-list',
  templateUrl: './swiss-player-list.component.html'
})
export class SwissPlayerListComponent implements OnInit {
  canDeletePlayers = true;
  players: Observable<Player[]>;
  selectedPlayer: Player;

  constructor(
    private pairingsService: PairingsService,
    private playerService: PlayerService
  ) {}

  ngOnInit() {
    this.players = this.playerService.players;
    this.playerService.selectedPlayer.subscribe(player => {
      this.selectedPlayer = player;
    });
    this.pairingsService.hasBegunPairings().subscribe(hasBegunPairings => this.canDeletePlayers = !hasBegunPairings);
  }

  deletePlayer(player: Player) {
    this.playerService.delete(player);
  }

  selectPlayer(player: Player) {
    this.playerService.setSelectedPlayer(player);
  }
}
