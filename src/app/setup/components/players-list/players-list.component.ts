import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Player } from '@mm/shared/models';
import { Subject } from 'rxjs';

@Component({
  selector: 'mm-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent {
  @Input() players: Player[];
  @Output() playerClicked = new EventEmitter<Player>();

  addingPlayer = false;
  newPlayerName = new FormControl('');

  private addingPlayerChanged = new Subject<boolean>();

  constructor(elementRef: ElementRef) {
    const element = elementRef.nativeElement as HTMLElement;

    this.addingPlayerChanged.subscribe((addingPlayer) => {
      if (addingPlayer) {
        const input = element.querySelector('input');

        if (input) {
          input.focus();
        }
      }
    });
  }

  startAddingPlayer() {
    this.addingPlayer = true;

    this.addingPlayerChanged.next(true);
    // const element = this.elementRef.nativeElement as HTMLElement;
    // const input = element.querySelector('input');

    // if (input) {
    //   input.focus();
    // }
  }
}
