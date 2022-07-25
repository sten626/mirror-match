import { Component } from '@angular/core';

interface Card {
  title: string;
  body: string;
  disabled?: boolean;
}

@Component({
  selector: 'mm-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
})
export class SetupComponent {
  cards: Card[] = [
    {
      title: 'Swiss Pairing',
      body: 'A non-eliminating tournament structure with a fixed number of rounds. Each round players play against opponents with a similar score.',
    },
    {
      title: 'Draft Pods',
      body: 'Coming soon.',
      disabled: true,
    },
  ];

  constructor() {}
}
