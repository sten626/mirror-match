import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';
import { Player } from '@mm/shared/models';

@Component({
  selector: 'mm-new-player-list-item',
  templateUrl: './new-player-list-item.component.html',
  styleUrls: ['./new-player-list-item.component.scss']
})
export class NewPlayerListItemComponent implements AfterViewInit {
  @Output() cancel = new EventEmitter();
  @Output() newPlayer = new EventEmitter<Player>();
  @ViewChild('nameInput') nameInput: ElementRef<HTMLInputElement>;

  constructor() {}

  ngAfterViewInit() {
    setTimeout(() => {
      const inputElement = this.nameInput.nativeElement;
      inputElement.focus();
      inputElement.scrollIntoView();
    });
  }

  onKeyup(event: KeyboardEvent) {
    if (event.code === 'Escape') {
      this.cancel.emit();
    } else if (event.code === 'Enter') {
      const inputElement = this.nameInput.nativeElement;

      this.newPlayer.emit({
        name: this.nameInput.nativeElement.value,
        dropped: false
      });
      inputElement.value = '';
    }
  }
}
