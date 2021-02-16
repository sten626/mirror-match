import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from '@mm/shared/models';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'mm-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent {
  @Input() adding: boolean;
  @Input() players: Player[];
  @Output() cancel = new EventEmitter();
  @Output() deletePlayer = new EventEmitter<number>();
  @Output() newPlayer = new EventEmitter<Player>();
  @Output() playerChanged = new EventEmitter<Update<Player>>();

  editingPlayer: Player;
  initialPlayers: Set<Player>;

  constructor() {}

  ngOnInit() {
    this.initialPlayers = new Set(this.players);
  }

  onCancel() {
    this.cancel.emit();
  }

  onCleared(player: Player) {
    const editingPlayerIndex = this.players.indexOf(player);
    this.deletePlayer.emit(player.id);

    if (editingPlayerIndex > 0) {
      this.editingPlayer = this.players[editingPlayerIndex - 1];
    }
  }

  onNewPlayer(player: Player) {
    this.newPlayer.emit(player);
  }

  onPlayerEdited(player: Player, name: string) {
    this.editingPlayer = null;

    if (player.name !== name) {
      this.playerChanged.emit({
        id: player.id,
        changes: { name }
      });
    }
  }
}
