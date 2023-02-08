import { Component } from '@angular/core';
import { Option } from '@mm/shared/components';

// interface Card {
//   title: string;
//   body: string;
//   link: string | null;
//   disabled: boolean;
// }

@Component({
  selector: 'mm-setup-page',
  templateUrl: './setup-page.component.html',
  styleUrls: ['./setup-page.component.scss'],
})
export class SetupPageComponent {
  eventStructures: Option[] = [
    { text: 'Single Elimination' },
    { text: 'Swiss' },
  ];
  matchTypes: Option[] = [
    { text: 'Best of 1', disabled: false },
    { text: 'Best of 3' },
  ];
  // cards: Card[] = [
  //   {
  //     title: 'Swiss Pairing',
  //     body: 'A non-eliminating tournament structure with a fixed number of rounds. Each round players play against opponents with a similar score.',
  //     link: 'players',
  //     disabled: false,
  //   },
  //   {
  //     title: 'Draft Pods',
  //     body: 'Coming soon.',
  //     link: null,
  //     disabled: true,
  //   },
  // ];

  constructor() {}

  // onClick(link: string | null) {
  //   if (link === null) {
  //     return;
  //   }

  //   this.router.navigate([link]);
  // }
}
