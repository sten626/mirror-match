import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'mm-players-toolbar',
  templateUrl: './players-toolbar.component.html',
  styleUrls: ['./players-toolbar.component.scss']
})
export class PlayersToolbarComponent {
  @Output() searched = new EventEmitter<string>();

  searching = false;

  constructor() {}

  onSearch(query: string) {
    this.searched.emit(query);
  }
}
