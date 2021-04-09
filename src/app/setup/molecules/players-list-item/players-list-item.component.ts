import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';

export abstract class AbstractPlayersListItemComponent {
  abstract input: ElementRef<HTMLInputElement>;

  abstract onBackspace(): void;
  abstract onEnter(): void;
  abstract onEscape(): void;

  onKeyup(event: KeyboardEvent) {
    switch (event.key) {
      case 'Backspace':
        this.onBackspace();
        break;
      case 'Enter':
        this.onEnter();
        break;
      case 'Escape':
        this.onEscape();
        break;
      default:
        return;
    }
  }
}

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

  isEditing = false;
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
