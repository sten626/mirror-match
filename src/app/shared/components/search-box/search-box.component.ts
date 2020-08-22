import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'mm-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit {
  @Output() search = new EventEmitter<string>();
  @ViewChild('searchBox', { static: true }) searchBox: ElementRef;

  private debounceTime = 300;
  private searchSubject = new Subject<string>();

  constructor() {}

  ngOnInit() {
    this.searchSubject
      .pipe(distinctUntilChanged(), debounceTime(this.debounceTime))
      .subscribe((query) => this.search.emit(query));
  }

  doSearch() {
    this.searchSubject.next(this.query());
  }

  private query(): string {
    return this.searchBox.nativeElement.value;
  }
}
