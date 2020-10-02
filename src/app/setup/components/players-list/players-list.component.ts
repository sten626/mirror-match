import { DOCUMENT } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output
} from '@angular/core';
import { Player } from '@mm/shared/models';

@Component({
  selector: 'mm-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent implements AfterViewChecked {
  @Input() players: Player[];
  @Input() playerNames: Set<string>;
  @Output() addPlayer = new EventEmitter<Player>();
  @Output() playerClicked = new EventEmitter<Player>();

  private scrollDownNeeded = false;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngAfterViewChecked() {
    if (this.scrollDownNeeded) {
      this.scrollDownNeeded = false;
      window.scrollTo(0, this.document.body.scrollHeight);
    }
  }

  onAddPlayer(player: Player) {
    this.scrollDownNeeded = true;
    this.addPlayer.emit(player);
  }
}
