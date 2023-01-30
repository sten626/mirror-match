import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'mm-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @HostBinding('class.disabled')
  @Input()
  disabled = false;

  constructor() {}
}
