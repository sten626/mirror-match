import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Player } from '@mm/shared/models';
import { AbstractPlayersListItemComponent } from '../abstract-players-list-item.component';

@Component({
  selector: 'mm-new-player-list-item',
  templateUrl: './new-player-list-item.component.html',
  styleUrls: [
    '../players-list-item/players-list-item.component.scss',
    './new-player-list-item.component.scss'
  ]
})
export class NewPlayerListItemComponent
  extends AbstractPlayersListItemComponent
  implements AfterViewInit {
  @Output() cancel = new EventEmitter();
  @Output() newPlayer = new EventEmitter<Player>();
  @ViewChild('nameInput') nameInput: ElementRef<HTMLInputElement>;

  name = new FormControl('');

  constructor() {
    super();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const inputElement = this.nameInput.nativeElement;
      inputElement.focus();
      inputElement.scrollIntoView();
    });
  }

  onBackspace() {
    return;
  }

  onEnter() {
    const newPlayerName = this.name.value;

    if (newPlayerName === '') {
      this.cancel.emit();
    } else {
      // TODO: Validation
      this.newPlayer.emit({
        name: newPlayerName,
        dropped: false
      });
      this.name.reset('');
    }
  }

  onEscape() {
    this.cancel.emit();
  }
}
