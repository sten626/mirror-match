import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import {
  Player,
  PlayerService
} from '../shared';

@Component({
  selector: 'mm-swiss-player-list',
  templateUrl: './swiss-player-list.component.html'
})
export class SwissPlayerListComponent implements OnInit {
  @Output() onDeletePlayer = new EventEmitter<Player>();
  @Output() onSelectPlayer = new EventEmitter<Player>();

  players: Player[];
  selectedPlayer: Player;

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.playerService.getAll().subscribe(players => this.players = players);
  }

  deletePlayer(player: Player) {
    this.onDeletePlayer.emit(player);
  }

  selectPlayer(player: Player) {
    this.selectedPlayer = player;
    this.onSelectPlayer.emit(this.selectedPlayer);
  }

  private resetSelectedPlayer() {
    this.selectedPlayer = new Player();
    this.onSelectPlayer.emit(this.selectedPlayer);
  }
}
