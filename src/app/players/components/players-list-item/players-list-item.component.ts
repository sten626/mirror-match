import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { PlayersListItem } from '@mm/players/components/players-list-item.abstract';
import { duplicatePlayerValidator } from '@mm/shared/directives';
import { Player } from '@mm/shared/models';
import { Update } from '@ngrx/entity';

@Component({
  selector: 'mm-players-list-item',
  templateUrl: './players-list-item.component.html',
  styleUrls: ['./players-list-item.component.scss']
})
export class PlayersListItemComponent
  extends PlayersListItem
  implements OnChanges {
  @HostBinding('class.editing')
  @Input()
  selected = false;

  @Input() player: Player;
  @Input() playerNames: Set<string>;
  @Output() cancel = new EventEmitter();
  @Output() changePlayer = new EventEmitter<Update<Player>>();
  @Output() deletePlayer = new EventEmitter();
  @Output() error = new EventEmitter<string>();
  @ViewChild('nameInput') nameInput: ElementRef<HTMLInputElement>;

  constructor() {
    super();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.selected?.currentValue) {
      this.name.setValue(this.player.name);
      const otherPlayerNames = new Set(this.playerNames);
      otherPlayerNames.delete(this.player.name);
      this.name.setValidators(duplicatePlayerValidator(otherPlayerNames));
      setTimeout(() => this.nameInput.nativeElement.focus());
    }
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
    const name = (this.name.value as string).trim();

    if (name.length === 0) {
      // Submitting after clearing the name, treat as delete.
      this.deletePlayer.emit();
    }

    if (this.name.errors?.playerExists) {
      this.error.emit(this.name.errors.playerExists);
      return;
    }

    this.changePlayer.emit({
      id: this.player.id,
      changes: { name }
    });
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
