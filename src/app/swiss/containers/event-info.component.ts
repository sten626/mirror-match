import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as fromSwiss from 'app/swiss/reducers';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './event-info.component.html'
})
export class EventInfoComponent implements OnInit {
  // activePlayers: number;
  // completedRound: string;
  currentRound$: Observable<number>;
  // droppedPlayers: number;
  numberOfRounds$: Observable<number>;
  // ongoingMatches: number;
  showEndEventConfirmation = false;
  // totalPlayers: number;

  constructor(private store: Store<fromSwiss.State>) {
    this.currentRound$ = store.pipe(
      select(fromSwiss.getCurrentRound)
    );
    this.numberOfRounds$ = store.pipe(
      select(fromSwiss.getNumberOfRounds)
    );
  }

  ngOnInit(): void {
    // Subscriptions for Rounds section.
    // this.numberOfRounds = this.roundService.getTotalNumberOfRounds();
    // this.roundService.currentRound$.subscribe((currentRound: number) => this.currentRound = currentRound);
    // this.roundService.completedRounds$.subscribe((completedRounds: number[]) => {
    //   if (completedRounds.length > 0) {
    //     this.completedRound = completedRounds[completedRounds.length - 1].toString();
    //   } else {
    //     this.completedRound = 'None';
    //   }
    // });
    // this.roundService.outstandingPairingsForCurrentRound$.subscribe((pairings: Pairing[]) => this.ongoingMatches = pairings.length);

    // Subscriptions for Players section.
    // this.playerService.numberOfPlayers$.subscribe((numberOfPlayers: number) => this.totalPlayers = numberOfPlayers);
    // this.playerService.numberOfActivePlayers$.subscribe((numberOfPlayers: number) => this.activePlayers = numberOfPlayers);
    // this.playerService.numberOfDroppedPlayers$.subscribe((numberOfPlayers: number) => this.droppedPlayers = numberOfPlayers);
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
