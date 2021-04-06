import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from '@mm/shared/models';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'mm-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent {
  @Input() adding = false;
  @Input() players: Player[];
  @Output() createPlayer = new EventEmitter<string>();
  @Output() deletePlayer = new EventEmitter<number>();
  @Output() playerChanged = new EventEmitter<Update<Player>>();

  editingPlayer: Player;

  constructor() {}

  createNewPlayer(name: string) {
    this.adding = false;
    this.createPlayer.emit(name.trim());
    this.adding = true;
  }

  onCleared(player: Player) {
    this.deletePlayer.emit(player.id);
  }

  onPlayerEdited(player: Player, name: string) {
    this.editingPlayer = null;
    name = name.trim();

    if (name.length < 1) {
      // If the name was left blank, remove the player.
      this.deletePlayer.emit(player.id);
    }

    if (player.name !== name) {
      this.playerChanged.emit({
        id: player.id,
        changes: { name }
      });
    }
  }
}
