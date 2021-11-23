import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  ViewChild
} from '@angular/core';
import { PlayersListItem } from '@mm/players/shared';
import { duplicatePlayerValidator } from '@mm/shared/directives';
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
  implements AfterViewInit, OnChanges {
  @Input() playerNames: Set<string>;
  @Output() cancel = new EventEmitter();
  @Output() createPlayer = new EventEmitter<Player>();
  @Output() error = new EventEmitter<string>();
  @ViewChild('nameInput') nameInput: ElementRef<HTMLInputElement>;

  constructor() {
    super();
  }

  ngOnChanges() {
    this.name.setValidators(duplicatePlayerValidator(this.playerNames));
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
      return;
    }

    if (this.name.errors?.playerExists) {
      this.error.emit(this.name.errors.playerExists);
      return;
    }

    const player: Player = {
      name: newPlayerName,
      dropped: false
    };
    this.createPlayer.emit(player);
    this.name.reset();
  }

  onEscape() {
    this.cancel.emit();
  }
}
