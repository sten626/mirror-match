import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'mm-setup-footer',
  templateUrl: './setup-footer.component.html',
  styleUrls: ['./setup-footer.component.scss']
})
export class SetupFooterComponent {
  @HostBinding('class.mm-setup-footer') setupFooter = true;

  constructor() {}
}
