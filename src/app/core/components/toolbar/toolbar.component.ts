import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mm-toolbar',
  templateUrl: './toolbar.component.html'
})
export class ToolbarComponent {
  @Input() header: string;
  @Output() toggleSidenav = new EventEmitter();

  constructor() {}
}
