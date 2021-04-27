import { ElementRef, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

export abstract class PlayersListItem {
  abstract nameInput: ElementRef<HTMLInputElement>;

  // Outputs
  abstract cancel: EventEmitter<any>;

  abstract onBlur(): void;
  abstract onEnter(): void;
  abstract onEscape(): void;

  name = new FormControl('');

  onKeyup(event: KeyboardEvent) {
    switch (event.key) {
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
