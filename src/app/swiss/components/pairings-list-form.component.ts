import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'mm-pairings-list-form',
  styles: ['.redo-matches { margin-right: 1em; }'],
  templateUrl: './pairings-list-form.component.html'
})
export class PairingsListFormComponent implements OnDestroy, OnInit {
  @Output() filterTextChanged = new EventEmitter<string>();

  filterTextSub: Subscription;
  pairingsListForm: FormGroup = new FormGroup({
    filterText: new FormControl(''),
    showOutstandingOnly: new FormControl(true)
  });

  ngOnInit() {
    this.filterTextSub = this.pairingsListForm.get('filterText').valueChanges.pipe(
      debounceTime(200),
      map(filterText => filterText.trim().toLowerCase()),
      distinctUntilChanged()
    ).subscribe(filterText => this.filterTextChanged.emit(filterText));
  }

  ngOnDestroy() {
    this.filterTextSub.unsubscribe();
  }
}
