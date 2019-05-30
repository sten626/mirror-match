import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromSwiss from 'app/swiss/reducers';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './event-info.component.html'
})
export class EventInfoComponent {
  activePlayers$: Observable<number>;
  // completedRound: string;
  currentRound$: Observable<number>;
  droppedPlayers$: Observable<number>;
  numberOfRounds$: Observable<number>;
  // ongoingMatches: number;
  showEndEventConfirmation = false;
  totalPlayers$: Observable<number>;

  constructor(private store: Store<fromSwiss.State>) {
    this.activePlayers$ = this.store.pipe(
      select(fromSwiss.getNumberOfActivePlayers)
    );
    this.currentRound$ = store.pipe(
      select(fromSwiss.getCurrentRound)
    );
    this.droppedPlayers$ = store.pipe(
      select(fromSwiss.getNumberOfDroppedPlayers)
    );
    this.numberOfRounds$ = store.pipe(
      select(fromSwiss.getNumberOfRounds)
    );
    this.totalPlayers$ = store.pipe(
      select(fromSwiss.getNumberOfPlayers)
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
