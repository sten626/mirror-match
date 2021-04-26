import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output
} from '@angular/core';
import { Player } from '@mm/shared/models';

@Component({
  selector: 'mm-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent implements OnChanges {
  @Input() players: Player[];
  // @Output() createPlayer = new EventEmitter<Player>();
  @Output() deletePlayer = new EventEmitter<number>();
  @Output() upsertPlayer = new EventEmitter<Player>();
  // @Output() playerChanged = new EventEmitter<Update<Player>>();

  selectedPlayerId: number;
  isAdding = false;
  playerNames = new Set<string>();

  constructor() {}

  ngOnChanges() {
    this.playerNames = new Set<string>(
      this.players.map((p) => p.name.toLowerCase())
    );
  }

  onCleared(player: Player) {
    this.deletePlayer.emit(player.id);
  }

  onCreatePlayer(name: string) {
    const player: Player = {
      name,
      dropped: false
    };
    this.upsertPlayer.emit(player);
  }

  selectPlayer(playerId: number | null) {
    this.selectedPlayerId = playerId;
  }

  startAdding() {
    this.isAdding = true;
  }
}
