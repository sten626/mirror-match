import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'mm-players-toolbar',
  templateUrl: './players-toolbar.component.html',
  styleUrls: ['./players-toolbar.component.scss']
})
export class PlayersToolbarComponent {
  @Output() searchingChanged = new EventEmitter<boolean>();
  @Output() searchQueryChanged = new EventEmitter<string>();

  private _searching = false;

  constructor() {}

  get searching(): boolean {
    return this._searching;
  }

  set searching(searching: boolean) {
    if (this._searching !== searching) {
      this._searching = searching;
      this.searchingChanged.emit(this._searching);
    }
  }

  onSearch(query: string) {
    this.searchQueryChanged.emit(query);
  }
}
