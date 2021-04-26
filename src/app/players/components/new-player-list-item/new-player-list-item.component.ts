import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';
import { PlayersListItem } from '@mm/players/components/players-list-item.abstract';
import { Player } from '@mm/shared/models';

@Component({
  selector: 'mm-new-player-list-item',
  templateUrl: './new-player-list-item.component.html',
  styleUrls: [
    '../players-list-item/players-list-item.component.scss',
    './new-player-list-item.component.scss'
  ]
})
export class NewPlayerListItemComponent
  extends PlayersListItem
  implements AfterViewInit {
  @Output() cancel = new EventEmitter();
  @Output() upsertPlayer = new EventEmitter<Player>();
  @ViewChild('nameInput') nameInput: ElementRef<HTMLInputElement>;

  constructor() {
    super();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const inputElement = this.nameInput.nativeElement;
      inputElement.focus();
      // inputElement.scrollIntoView();
    });
  }

  onBlur() {
    this.cancel.emit();
  }

  onEnter() {
    const newPlayerName = (this.name.value as string).trim();

    if (newPlayerName === '') {
      this.cancel.emit();
    } else {
      // TODO: Validation
      const player: Player = {
        name: newPlayerName,
        dropped: false
      };
      this.upsertPlayer.emit(player);
      this.name.reset();
    }
  }

  onEscape() {
    this.cancel.emit();
  }
}
