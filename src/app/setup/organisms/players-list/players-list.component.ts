import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Player } from '@mm/shared/models';

@Component({
  selector: 'mm-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent implements OnInit {
  @Input() isAdding: boolean;
  @Input() players: Player[];
  @Output() cancel = new EventEmitter();
  @Output() newPlayer = new EventEmitter<Player>();

  initialPlayers: Set<Player>;

  constructor() {}

  ngOnInit() {
    this.initialPlayers = new Set(this.players);
  }

  onCancel() {
    this.cancel.emit();
  }

  onNewPlayer(player: Player) {
    this.newPlayer.emit(player);
  }
}