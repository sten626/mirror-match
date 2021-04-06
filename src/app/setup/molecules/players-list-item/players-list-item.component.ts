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

@Component({
  selector: 'mm-players-list-item',
  templateUrl: './players-list-item.component.html',
  styleUrls: ['./players-list-item.component.scss']
})
export class PlayersListItemComponent implements OnChanges {
  @Input() playerName = '';
  @Output() cleared = new EventEmitter();
  @Output() doneEditing = new EventEmitter<string>();
  @ViewChild('input') playerNameInput: ElementRef<HTMLInputElement>;

  isEditing = false;
  isEmpty = false;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.editing?.currentValue) {
      console.log('huh');
      setTimeout(() => {
        console.log(this.playerNameInput);
        this.playerNameInput.nativeElement.focus();
      });
    }

    if (changes.playerName) {
      const currentName = changes.playerName.currentValue as string;
      this.isEmpty = currentName.length < 1;
    }
  }

  onKeyup(event: KeyboardEvent) {
    if (event.key === 'Backspace') {
      const input = event.target as HTMLInputElement;

      if (this.isEmpty) {
        this.cleared.emit();
      } else if (!input.value) {
        this.isEmpty = true;
      }
    } else if (event.key === 'Enter') {
      this.stopEditing();
    }
  }

  startEditing() {
    this.isEditing = true;
    setTimeout(() => {
      this.playerNameInput.nativeElement.focus();
    });
  }

  stopEditing() {
    const newText = this.playerNameInput.nativeElement.value.trim();
    this.doneEditing.emit(newText);
    this.isEditing = false;
  }
}
