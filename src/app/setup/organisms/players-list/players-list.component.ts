import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChange,
  SimpleChanges
} from '@angular/core';
import { Player } from '@mm/shared/models';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'mm-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent implements OnChanges {
  @Input() players: Player[];
  @Output() createPlayer = new EventEmitter();
  @Output() deletePlayer = new EventEmitter<number>();
  @Output() playerChanged = new EventEmitter<Update<Player>>();

  editingPlayer: Player;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.players) {
      const playerChange: SimpleChange = changes.players;

      if (playerChange.firstChange) {
        return;
      }

      const current: Player[] = playerChange.currentValue;
      const previous: Player[] = playerChange.previousValue;

      if (current.length > previous.length) {
        this.editingPlayer = current[current.length - 1];
      }
    }
  }

  onCleared(player: Player) {
    // const editingPlayerIndex = this.players.indexOf(player);
    this.deletePlayer.emit(player.id);

    // if (editingPlayerIndex > 0) {
    //   this.editingPlayer = this.players[editingPlayerIndex - 1];
    // }
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
