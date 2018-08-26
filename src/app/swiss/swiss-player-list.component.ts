import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
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
  @Input() selectedPlayer: Player;
  @Output() playerSelected = new EventEmitter<Player>();

  hasBegunTournament = false;
  players: Observable<Player[]>;

  constructor(
    private playerService: PlayerService,
    private roundService: RoundService
  ) {}

  ngOnInit() {
    this.players = this.playerService.players$;
    this.roundService.hasBegunTournament.subscribe((hasBegun: boolean) => this.hasBegunTournament = hasBegun);
  }

  deletePlayer(player: Player) {
    this.playerService.deletePlayer(player);
  }

  selectPlayer(player: Player) {
    this.playerSelected.emit(player);
  }
}
