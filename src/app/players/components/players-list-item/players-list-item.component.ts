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
import { FormControl } from '@angular/forms';
import { Player } from '@mm/shared/models';
import { AbstractPlayersListItemComponent } from '../abstract-players-list-item.component';

@Component({
  selector: 'mm-players-list-item',
  templateUrl: './players-list-item.component.html',
  styleUrls: ['./players-list-item.component.scss']
})
export class PlayersListItemComponent
  extends AbstractPlayersListItemComponent
  implements OnChanges {
  @HostBinding('class.editing') isEditing = false;
  @Input() player: Player;
  @Output() cleared = new EventEmitter();
  @Output() doneEditing = new EventEmitter<string>();
  @ViewChild('nameInput') nameInput: ElementRef<HTMLInputElement>;

  name = new FormControl('');

  isEmpty = false;

  constructor() {
    super();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.playerName) {
      const currentName = changes.playerName.currentValue as string;
      this.isEmpty = currentName.length < 1;
    }
  }

  onBackspace() {
    if (this.isEmpty) {
      this.cleared.emit();
    } else if (!this.nameInput.nativeElement.value) {
      this.isEmpty = true;
    }
  }

  onEnter() {
    this.stopEditing();
  }

  onEscape() {
    this.doneEditing.emit(this.player.name);
    this.isEditing = false;
  }

  startEditing() {
    this.isEditing = true;
    this.name.setValue(this.player.name);
    setTimeout(() => {
      this.nameInput.nativeElement.focus();
    });
  }

  stopEditing() {
    this.doneEditing.emit(this.name.value.trim());
    this.isEditing = false;
  }
}
