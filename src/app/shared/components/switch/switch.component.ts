import { Component, Input } from '@angular/core';

@Component({
  selector: 'mm-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss'],
})
export class SwitchComponent {
  @Input()
  disabled = false;

  @Input()
  selected = false;

  handleClick() {
    if (this.disabled) {
      return;
    }

    this.selected = !this.selected;
  }

  styleClasses(): Record<string, boolean> {
    return {
      selected: this.selected,
    };
  }
}
