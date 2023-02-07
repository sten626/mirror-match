import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

export interface Option {
  text: string;
  disabled?: boolean;
}

@Component({
  selector: 'mm-segmented-button',
  templateUrl: './segmented-button.component.html',
  styleUrls: ['./segmented-button.component.scss'],
  animations: [
    trigger('showHideCheck', [
      transition(':enter', [
        style({ 'font-size': 0 }),
        animate('200ms', style({})),
      ]),
    ]),
  ],
})
export class SegmentedButtonComponent {
  @Input()
  options: Option[] = [];

  @Input()
  selected: Option | null = null;

  constructor() {}

  buttonClasses(option: Option): Record<string, boolean> {
    return {
      // disabled: !!option.disabled,
      selected: option === this.selected,
    };
  }

  handleSelect(option: Option) {
    if (option.disabled) {
      return;
    }

    this.selected = option;
  }
}
