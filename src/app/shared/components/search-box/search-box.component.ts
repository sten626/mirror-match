import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'mm-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent {
  @Output() focused = new EventEmitter<string>();
  @Output() searched: Observable<string>;
  @ViewChild('searchBox', { static: true }) searchBox: ElementRef;

  private debounceTime = 300;
  private searchSubject = new Subject<string>();

  constructor() {
    this.searched = this.searchSubject.pipe(
      distinctUntilChanged(),
      debounceTime(this.debounceTime)
    );
  }

  private get query(): string {
    return this.searchBox.nativeElement.value;
  }

  doFocus() {
    this.focused.emit(this.query);
  }

  doSearch() {
    this.searchSubject.next(this.query);
  }
}
