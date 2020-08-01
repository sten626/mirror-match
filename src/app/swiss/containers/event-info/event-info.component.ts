import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromSwiss from '@mm/swiss/reducers';
import { Observable } from 'rxjs';
import { EventInfoPageActions } from '@mm/swiss/actions';

@Component({
  templateUrl: './event-info.component.html'
})
export class EventInfoComponent {
  activePlayers$: Observable<number>;
  completedRoundId$: Observable<number>;
  currentRoundId$: Observable<number>;
  droppedPlayers$: Observable<number>;
  numberOfMatchesInProgress$: Observable<number>;
  numberOfRounds$: Observable<number>;
  showEndEventConfirmation = false;
  totalPlayers$: Observable<number>;

  constructor(private store: Store<fromSwiss.State>) {
    // this.activePlayers$ = this.store.pipe(
    //   select(fromSwiss.getTotalActivePlayers)
    // );
    this.completedRoundId$ = this.store.pipe(
      select(fromSwiss.getCompletedRoundId)
    );
    this.currentRoundId$ = store.pipe(
      select(fromSwiss.getTotalRounds)
    );
    // this.droppedPlayers$ = store.pipe(
    //   select(fromSwiss.getTotalDroppedPlayers)
    // );
    this.numberOfRounds$ = store.pipe(
      select(fromSwiss.getNumberOfRounds)
    );
    this.numberOfMatchesInProgress$ = store.pipe(
      select(fromSwiss.getSelectedRoundPairingsOutstandingTotal)
    );
    // this.totalPlayers$ = store.pipe(
    //   select(fromSwiss.getTotalPlayers)
    // );
  }

  /**
   * Sets a boolean value to hide the end event confirmation.
   */
  cancelEndEvent(): void {
    this.showEndEventConfirmation = false;
  }

  /**
   * Dispatch an endEventConfirmed action to clear all data.
   */
  endEventConfirm(): void {
    this.store.dispatch(EventInfoPageActions.endEventConfirmed());
  }

  /**
   * Sets a boolean value to show the end event confirmation.
   */
  endEventClicked(): void {
    this.showEndEventConfirmation = true;
  }
}
