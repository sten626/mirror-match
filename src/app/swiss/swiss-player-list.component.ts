import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
  @Input() selectedPlayer: Player;
  @Output() onDeletePlayer = new EventEmitter<Player>();
  @Output() onSelectPlayer = new EventEmitter<Player>();

  canDeletePlayers = true;
  players: Player[];

  constructor(
    private pairingsService: PairingsService,
    private playerService: PlayerService
  ) {}

  ngOnInit() {
    this.playerService.players.subscribe(players => this.players = players);
    this.pairingsService.hasBegunPairings().subscribe(hasBegunPairings => this.canDeletePlayers = !hasBegunPairings);
  }

  deletePlayer(player: Player) {
    this.onDeletePlayer.emit(player);
  }

  selectPlayer(player: Player) {
    this.onSelectPlayer.emit(player);
  }
}
