import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'mm-setup-footer',
  templateUrl: './setup-footer.component.html',
  styleUrls: ['./setup-footer.component.scss']
})
export class SetupFooterComponent {
  @Output() deleteAll = new EventEmitter();

  constructor() {}

  deleteAllClicked() {
    this.deleteAll.emit();
  }
}
