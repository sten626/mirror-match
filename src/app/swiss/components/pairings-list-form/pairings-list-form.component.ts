import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  selector: 'mm-pairings-list-form',
  styles: ['.redo-matches { margin-right: 1em; }'],
  templateUrl: './pairings-list-form.component.html',
})
export class PairingsListFormComponent implements OnDestroy {
  @Input() hasSubmittedPairings: boolean = false;
  @Input() selectedRoundComplete: boolean = false;
  @Output() deleteResults = new EventEmitter<any>();
  @Output() filterTextChanged = new EventEmitter<string>();
  @Output() redoMatches = new EventEmitter<any>();
  @Output() showOutstandingOnlyChanged = new EventEmitter<boolean>();

  filterTextSub: Subscription;
  pairingsListForm: UntypedFormGroup = new UntypedFormGroup({
    filterText: new UntypedFormControl(''),
    showOutstandingOnly: new UntypedFormControl(true),
  });
  showOutstandingOnlySub: Subscription;

  constructor() {
    this.filterTextSub = this.pairingsListForm
      .get('filterText')!
      .valueChanges.pipe(
        debounceTime(200),
        map((filterText) => filterText.trim().toLowerCase()),
        distinctUntilChanged()
      )
      .subscribe((filterText) => this.filterTextChanged.emit(filterText));

    this.showOutstandingOnlySub = this.pairingsListForm
      .get('showOutstandingOnly')!
      .valueChanges.subscribe((showOutstandingOnly) =>
        this.showOutstandingOnlyChanged.emit(showOutstandingOnly)
      );
  }

  ngOnDestroy() {
    this.filterTextSub.unsubscribe();
    this.showOutstandingOnlySub.unsubscribe();
  }
}
