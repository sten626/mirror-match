import { Component } from '@angular/core';

@Component({
  selector: 'mm-layout-footer',
  styleUrls: ['./footer.component.scss'],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  today: number = Date.now();
  version: string = require('../../../../../package.json').version;
}
