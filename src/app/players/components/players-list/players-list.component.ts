import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output
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
  @Output() changePlayer = new EventEmitter<Update<Player>>();
  @Output() createPlayer = new EventEmitter<Player>();
  @Output() deletePlayer = new EventEmitter<number>();
  @Output() error = new EventEmitter<string>();

  selectedPlayerId: number;
  isAdding = false;
  playerNames = new Set<string>();

  constructor() {}

  ngOnChanges() {
    this.playerNames = new Set<string>(this.players.map((p) => p.name));
  }

  onChangePlayer(update: Update<Player>) {
    this.selectedPlayerId = null;
    this.changePlayer.emit(update);
  }

  onDeletePlayer(playerId: number) {
    this.selectedPlayerId = null;
    this.deletePlayer.emit(playerId);
  }

  selectPlayer(playerId: number | null) {
    this.selectedPlayerId = playerId;
  }

  startAdding() {
    this.isAdding = true;
  }
}
