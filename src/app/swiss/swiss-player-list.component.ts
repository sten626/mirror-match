import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import {
  Player,
  PlayerService
} from '../shared';

@Component({
  selector: 'mm-swiss-player-list',
  templateUrl: './swiss-player-list.component.html'
})
export class SwissPlayerListComponent implements OnInit {
  @Input() selectedPlayer: Player;
  @Output() onDeletePlayer = new EventEmitter<Player>();
  @Output() onSelectPlayer = new EventEmitter<Player>();

  players: Player[];

  constructor(private playerService: PlayerService) { }

  ngOnInit() {
    this.playerService.getAll().subscribe(players => this.players = players);
  }

  deletePlayer(player: Player) {
    this.onDeletePlayer.emit(player);
  }

  selectPlayer(player: Player) {
    this.onSelectPlayer.emit(player);
  }
}
