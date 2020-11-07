import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
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
  @Output() addPlayer = new EventEmitter();
  @Output() updatePlayer = new EventEmitter<Update<Player>>();

  selectedPlayer: Player;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.players && !changes.players.firstChange) {
      const previous = changes.players.previousValue as Player[];
      const current = changes.players.currentValue as Player[];

      if (current.length > previous.length) {
        // There's a new player.
        this.selectedPlayer = current[current.length - 1];
      } else {
        // A player was updated.
        this.selectedPlayer = null;
      }
    }
  }

  addPlayerClicked() {
    this.addPlayer.emit();
  }
}
