import { ElementRef } from '@angular/core';

export abstract class AbstractPlayersListItemComponent {
  abstract nameInput: ElementRef<HTMLInputElement>;

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
