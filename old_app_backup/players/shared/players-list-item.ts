import { ElementRef, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

export abstract class PlayersListItem {
  // Inputs
  abstract playerNames: Set<string>;

  // Outputs
  abstract cancel: EventEmitter<any>;
  abstract error: EventEmitter<string>;

  abstract onBlur(event: any): void;
  abstract onEnter(): void;
  abstract onEscape(): void;

  name = new FormControl('');
  abstract nameInput: ElementRef<HTMLInputElement>;

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
