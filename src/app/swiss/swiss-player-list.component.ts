import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import {
  Player,
  PlayerService,
  RoundService
} from '../shared';

@Component({
  selector: 'mm-swiss-player-list',
  templateUrl: './swiss-player-list.component.html'
})
export class SwissPlayerListComponent implements OnInit {
  hasBegunTournament = false;
  players: Observable<Player[]>;
  selectedPlayer: Player;

  constructor(
    private playerService: PlayerService,
    private roundService: RoundService
  ) {}

  ngOnInit() {
    this.players = this.playerService.players$;
    this.playerService.selectedPlayer$.subscribe((player: Player) => {
      this.selectedPlayer = player;
    });
    this.roundService.hasBegunTournament.subscribe((hasBegun: boolean) => this.hasBegunTournament = hasBegun);
  }

  deletePlayer(player: Player) {
    this.playerService.deletePlayer(player);
  }

  selectPlayer(player: Player) {
    this.playerService.setSelectedPlayer(player);
  }
}
