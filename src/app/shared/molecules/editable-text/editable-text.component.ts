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
  @Input() text: string;
  @Output() doneEditing = new EventEmitter<string>();
  @ViewChild('input') input: ElementRef<HTMLInputElement>;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes?.editing?.currentValue) {
      setTimeout(() => this.input.nativeElement.focus());
    }
  }

  stopEditing() {
    const newText = this.input.nativeElement.value.trim();
    this.doneEditing.emit(newText);
    this.editing = false;
  }
}
