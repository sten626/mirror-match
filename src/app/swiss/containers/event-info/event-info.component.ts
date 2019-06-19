import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromSwiss from 'app/swiss/reducers';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './event-info.component.html'
})
export class EventInfoComponent {
  activePlayers$: Observable<number>;
  completedRoundId$: Observable<number>;
  currentRoundId$: Observable<number>;
  droppedPlayers$: Observable<number>;
  numberOfRounds$: Observable<number>;
  ongoingMatchesTotal$: Observable<number>;
  showEndEventConfirmation = false;
  totalPlayers$: Observable<number>;

  constructor(private store: Store<fromSwiss.State>) {
    this.activePlayers$ = this.store.pipe(
      select(fromSwiss.getTotalActivePlayers)
    );
    this.completedRoundId$ = this.store.pipe(
      select(fromSwiss.getCompletedRoundId)
    );
    this.currentRoundId$ = store.pipe(
      select(fromSwiss.getTotalRounds)
    );
    this.droppedPlayers$ = store.pipe(
      select(fromSwiss.getTotalDroppedPlayers)
    );
    this.numberOfRounds$ = store.pipe(
      select(fromSwiss.getNumberOfRounds)
    );
    this.ongoingMatchesTotal$ = store.pipe(
      select(fromSwiss.getSelectedRoundPairingsOutstandingTotal)
    );
    this.totalPlayers$ = store.pipe(
      select(fromSwiss.getTotalPlayers)
    );
  }

  cancelEndEvent(): void {
    this.showEndEventConfirmation = false;
  }

  endEventConfirm(): void {
    localStorage.clear();
    window.location.reload();
  }

  endEventClicked(): void {
    this.showEndEventConfirmation = true;
  }
}
