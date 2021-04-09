import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';
import { AbstractPlayersListItemComponent } from '@mm/setup/molecules/players-list-item/players-list-item.component';
import { Player } from '@mm/shared/models';

@Component({
  selector: 'mm-new-player-list-item',
  templateUrl: './new-player-list-item.component.html',
  styleUrls: [
    './new-player-list-item.component.scss',
    '../players-list-item/players-list-item.component.scss'
  ]
})
export class NewPlayerListItemComponent
  extends AbstractPlayersListItemComponent
  implements AfterViewInit {
  @Output() cancel = new EventEmitter();
  @Output() newPlayer = new EventEmitter<Player>();
  @ViewChild('input') input: ElementRef<HTMLInputElement>;

  constructor() {
    super();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const inputElement = this.input.nativeElement;
      inputElement.focus();
      inputElement.scrollIntoView();
    });
  }

  onBackspace() {
    return;
  }

  onEnter() {
    const inputElement = this.input.nativeElement;
    const newPlayerName = inputElement.value.trim();

    if (newPlayerName === '') {
      this.cancel.emit();
    } else {
      // TODO: Validation
      this.newPlayer.emit({
        name: this.input.nativeElement.value,
        dropped: false
      });
      inputElement.value = '';
    }
  }

  onEscape() {
    this.cancel.emit();
  }
}
