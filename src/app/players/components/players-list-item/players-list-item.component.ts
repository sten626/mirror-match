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
import { AbstractPlayersListItemComponent } from '../abstract-players-list-item.component';

@Component({
  selector: 'mm-players-list-item',
  templateUrl: './players-list-item.component.html',
  styleUrls: ['./players-list-item.component.scss']
})
export class PlayersListItemComponent
  extends AbstractPlayersListItemComponent
  implements OnChanges {
  @Input() playerName = '';
  @Output() cleared = new EventEmitter();
  @Output() doneEditing = new EventEmitter<string>();
  @ViewChild('input') input: ElementRef<HTMLInputElement>;

  @HostBinding('class.editing') isEditing = false;

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
    } else if (!this.input.nativeElement.value) {
      this.isEmpty = true;
    }
  }

  onEnter() {
    this.stopEditing();
  }

  onEscape() {
    this.doneEditing.emit(this.playerName);
    this.isEditing = false;
  }

  startEditing() {
    this.isEditing = true;
    setTimeout(() => {
      this.input.nativeElement.focus();
    });
  }

  stopEditing() {
    const newText = this.input.nativeElement.value.trim();
    this.doneEditing.emit(newText);
    this.isEditing = false;
  }
}
