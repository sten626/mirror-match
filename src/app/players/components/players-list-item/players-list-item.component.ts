import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { PlayersListItem } from '@mm/players/components/players-list-item.abstract';
import { Player } from '@mm/shared/models';

@Component({
  selector: 'mm-players-list-item',
  templateUrl: './players-list-item.component.html',
  styleUrls: ['./players-list-item.component.scss']
})
export class PlayersListItemComponent extends PlayersListItem {
  // @HostBinding('class.editing') isEditing = false;
  @HostBinding('class.editing')
  @Input()
  selected = false;

  @Input() player: Player;
  @Input() playerNames: Set<string>;
  @Output() cancel = new EventEmitter();
  @Output() clickDelete = new EventEmitter();
  @Output() upsertPlayer = new EventEmitter<Player>();
  @ViewChild('nameInput') nameInput: ElementRef<HTMLInputElement>;

  constructor() {
    super();
  }

  onBlur() {
    this.submit();
  }

  onEnter() {
    this.submit();
  }

  onEscape() {
    this.cancel.emit();
  }

  private submit() {
    //TODO: Validation.
    const name = (this.name.value as string).trim();
    const player: Player = {
      ...this.player,
      name
    };
    this.upsertPlayer.emit(player);
  }

  // startEditing() {
  //   // this.isEditing = true;
  //   this.playerNames.delete(this.player.name);
  //   this.name.setValidators(newPlayerValidator(this.playerNames));
  //   this.name.setValue(this.player.name);
  //   setTimeout(() => {
  //     this.nameInput.nativeElement.focus();
  //   });
  // }

  // stopEditing() {
  //   this.doneEditing.emit(this.name.value.trim());
  //   // this.isEditing = false;
  // }
}
