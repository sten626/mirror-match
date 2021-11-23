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
import { PlayersListItem } from '@mm/players/shared';
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

  onBlur(event) {
    console.log(event);
    this.submit();
  }

  onEnter() {
    this.submit();
  }

  onEscape() {
    this.name.reset();
    this.cancel.emit();
  }

  onDeletePlayer() {
    console.log('delete');
    this.deletePlayer.emit();
  }

  private submit() {
    const name = (this.name.value as string).trim();

    if (name.length === 0) {
      // Submitting after clearing the name, treat as delete.
      this.deletePlayer.emit();
      return;
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
}
