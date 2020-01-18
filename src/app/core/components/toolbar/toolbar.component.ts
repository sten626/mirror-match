import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mm-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input() header: string;
  @Output() toggleSidenav = new EventEmitter();

  constructor() {}
}
