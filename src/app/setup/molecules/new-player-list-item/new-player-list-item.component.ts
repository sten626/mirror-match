import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'mm-new-player-list-item',
  templateUrl: './new-player-list-item.component.html',
  styleUrls: ['./new-player-list-item.component.scss']
})
export class NewPlayerListItemComponent implements AfterViewInit {
  @ViewChild('nameInput') nameInput: ElementRef<HTMLInputElement>;
  isAdding = false;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    setTimeout(() => this.nameInput.nativeElement.focus());
  }

  onBlur() {
    this.isAdding = false;
  }

  onClick() {
    this.isAdding = true;
    setTimeout(() => {
      const name: HTMLInputElement = this.el.nativeElement.querySelector(
        '.name-input'
      );
      name.focus();
    });
  }

  onKeyup(event: KeyboardEvent) {
    if (event.code === 'Escape') {
      this.isAdding = false;
    }
  }
}
