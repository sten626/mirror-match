import { Component, Input } from '@angular/core';

@Component({
  selector: 'mm-editable-text',
  templateUrl: './editable-text.component.html',
  styleUrls: ['./editable-text.component.scss']
})
export class EditableTextComponent {
  @Input() editing = true;
  @Input() text: string;

  constructor() {}
}
