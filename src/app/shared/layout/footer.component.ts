import { Component, OnInit } from '@angular/core';
import * as feather from 'feather-icons';

@Component({
  selector: 'mm-layout-footer',
  styleUrls: ['./footer.component.css'],
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  today: number = Date.now();
  version = require('../../../../package.json').version;

  ngOnInit() {
    feather.replace();
  }
}
