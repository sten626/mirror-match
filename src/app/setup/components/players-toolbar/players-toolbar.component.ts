import { Component } from '@angular/core';

@Component({
  selector: 'mm-players-toolbar',
  templateUrl: './players-toolbar.component.html',
  styleUrls: ['./players-toolbar.component.scss']
})
export class PlayersToolbarComponent {
  searching = false;

  // @ViewChildren('searchInput')
  // private searchInput: QueryList<ElementRef>;

  constructor() {}

  onSearch(query: string) {
    console.log(query);
  }
}
