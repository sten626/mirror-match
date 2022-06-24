import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'mm-top-app-bar',
  templateUrl: './top-app-bar.component.html',
  styleUrls: ['./top-app-bar.component.scss'],
})
export class TopAppBarComponent implements OnInit {
  scrolled = false;

  constructor() {}

  ngOnInit(): void {}

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 0;
  }
}
