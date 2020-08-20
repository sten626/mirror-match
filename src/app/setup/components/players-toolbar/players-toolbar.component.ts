import {
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChildren
} from '@angular/core';

@Component({
  selector: 'mm-players-toolbar',
  templateUrl: './players-toolbar.component.html',
  styleUrls: ['./players-toolbar.component.scss']
})
export class PlayersToolbarComponent implements AfterViewInit {
  searching = false;

  @ViewChildren('searchInput')
  private searchInput: QueryList<ElementRef>;

  constructor() {}

  ngAfterViewInit() {
    this.searchInput.changes.subscribe((queryList: QueryList<ElementRef>) => {
      if (queryList.length) {
        queryList.first.nativeElement.focus();
      }
    });
  }
}
