import { DOCUMENT } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  EventEmitter,
  Inject,
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
export class PlayersListComponent implements AfterViewChecked, OnChanges {
  @Input() players: Player[];
  // @Input() playerNames: Set<string>;
  @Output() addPlayer = new EventEmitter();
  @Output() playerClicked = new EventEmitter<Player>();
  @Output() updatePlayer = new EventEmitter<Update<Player>>();

  playerNames = new Set<string>();

  private scrollDownNeeded = false;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.players) {
      const players = changes.players.currentValue as Player[];
      const playerNames = players.map((player) => player.name);
      this.playerNames = new Set(playerNames);
    }
  }

  ngAfterViewChecked() {
    if (this.scrollDownNeeded) {
      this.scrollDownNeeded = false;
      window.scrollTo(0, this.document.body.scrollHeight);
    }
  }

  addPlayerClicked() {
    this.addPlayer.emit();
  }

  // onAddPlayer(player: Player) {
  //   this.scrollDownNeeded = true;
  //   this.addPlayer.emit(player);
  // }
}
