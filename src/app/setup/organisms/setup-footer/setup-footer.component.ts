import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'mm-setup-footer',
  templateUrl: './setup-footer.component.html',
  styleUrls: ['./setup-footer.component.scss']
})
export class SetupFooterComponent {
  @Output() add = new EventEmitter();
  @Output() deleteAll = new EventEmitter();

  constructor() {}

  addClicked() {
    this.add.emit();
  }

  deleteAllClicked() {
    this.deleteAll.emit();
  }
}
