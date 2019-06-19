import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'mm-pairings-list-form',
  styles: ['.redo-matches { margin-right: 1em; }'],
  templateUrl: './pairings-list-form.component.html'
})
export class PairingsListFormComponent implements OnDestroy, OnInit {
  @Input() hasSubmittedPairings: boolean;
  @Input() selectedRoundComplete: boolean;
  @Output() deleteResults = new EventEmitter<any>();
  @Output() filterTextChanged = new EventEmitter<string>();
  @Output() redoMatches = new EventEmitter<any>();
  @Output() showOutstandingOnlyChanged = new EventEmitter<boolean>();

  filterTextSub: Subscription;
  pairingsListForm: FormGroup = new FormGroup({
    filterText: new FormControl(''),
    showOutstandingOnly: new FormControl(true)
  });
  showOutstandingOnlySub: Subscription;

  ngOnInit() {
    this.filterTextSub = this.pairingsListForm.get('filterText').valueChanges.pipe(
      debounceTime(200),
      map(filterText => filterText.trim().toLowerCase()),
      distinctUntilChanged()
    ).subscribe(filterText => this.filterTextChanged.emit(filterText));

    this.showOutstandingOnlySub = this.pairingsListForm.get('showOutstandingOnly').valueChanges.subscribe(
      showOutstandingOnly => this.showOutstandingOnlyChanged.emit(showOutstandingOnly)
    );
  }

  ngOnDestroy() {
    this.filterTextSub.unsubscribe();
    this.showOutstandingOnlySub.unsubscribe();
  }
}
