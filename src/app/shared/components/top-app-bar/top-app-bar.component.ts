import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'mm-top-app-bar',
  templateUrl: './top-app-bar.component.html',
  styleUrls: ['./top-app-bar.component.scss'],
})
export class TopAppBarComponent {
  scrolled = false;

  constructor() {}

  @HostListener('window:scroll')
  handleScroll() {
    this.scrolled = window.pageYOffset > 0;
  }
}
