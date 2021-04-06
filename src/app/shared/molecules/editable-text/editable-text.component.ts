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
  selector: 'mm-editable-text',
  templateUrl: './editable-text.component.html',
  styleUrls: ['./editable-text.component.scss']
})
export class EditableTextComponent implements OnChanges {
  @Input() editing = false;
  @Input() text = '';
  @Output() cleared = new EventEmitter();
  @Output() doneEditing = new EventEmitter<string>();
  @ViewChild('input') input: ElementRef<HTMLInputElement>;

  isEmpty = false;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.editing?.currentValue) {
      setTimeout(() => this.input.nativeElement.focus());
    }

    if (changes.text) {
      const currentText = changes.text.currentValue as string;
      this.isEmpty = currentText.length === 0;
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

  stopEditing() {
    const newText = this.input.nativeElement.value.trim();
    this.doneEditing.emit(newText);
  }
}
