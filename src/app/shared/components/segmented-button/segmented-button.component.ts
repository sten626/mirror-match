import { Component, Input } from '@angular/core';

@Component({
  selector: 'mm-segmented-button',
  templateUrl: './segmented-button.component.html',
  styleUrls: ['./segmented-button.component.scss'],
})
export class SegmentedButtonComponent {
  @Input()
  options: string[] = [];

  selected = 'Best of 1';

  constructor() {}

  handleSelect(option: string) {
    this.selected = option;
  }
}
