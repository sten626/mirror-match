import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'mm-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  @HostListener('scroll')
  onScroll() {
    console.log('AAAHH');
  }
}
