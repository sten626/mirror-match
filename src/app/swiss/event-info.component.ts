import { Component, OnInit } from '@angular/core';

import { Pairing, PlayerService, RoundService, PairingService } from '../shared';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

@Component({
  templateUrl: './event-info.component.html'
})
export class EventInfoComponent implements OnInit {
  activePlayersCount$: Observable<number>;
  completedRound$: Observable<number | string>;
  currentRound$: Observable<number>;
  droppedPlayersCount$: Observable<number>;
  numOfRounds$: Observable<number>;
  ongoingPairingsCount$: Observable<number>;
  playersCount$: Observable<number>;
  // activePlayers: number;
  // droppedPlayers: number;
  // ongoingMatches: number;
  // showEndEventConfirmation = false;
  // totalPlayers: number;

  constructor(
    private pairingService: PairingService,
    private playerService: PlayerService,
    private roundService: RoundService
  ) {
    this.activePlayersCount$ = this.playerService.activePlayersCount$;
    this.completedRound$ = this.roundService.latestCompletedRound$;
    this.currentRound$ = this.roundService.currentRound$;
    this.droppedPlayersCount$ = this.playerService.droppedPlayersCount$;
    this.numOfRounds$ = this.roundService.totalNumOfRounds$;
    this.ongoingPairingsCount$ = this.pairingService.ongoingPairingsCount$;
    this.playersCount$ = this.playerService.playersCount$;
  }

  ngOnInit(): void {
    this.pairingService.loadPairings();
    this.playerService.loadPlayers();
    // Subscriptions for Rounds section.
    // this.roundService.outstandingPairingsForCurrentRound.subscribe((pairings: Pairing[]) => this.ongoingMatches = pairings.length);

    // // Subscriptions for Players section.
    // this.playerService.numberOfPlayers.subscribe((numberOfPlayers: number) => this.totalPlayers = numberOfPlayers);
    // this.playerService.numberOfActivePlayers.subscribe((numberOfPlayers: number) => this.activePlayers = numberOfPlayers);
    // this.playerService.numberOfDroppedPlayers.subscribe((numberOfPlayers: number) => this.droppedPlayers = numberOfPlayers);
  }

  cancelEndEvent(): void {
    // this.showEndEventConfirmation = false;
  }

  endEventConfirm(): void {
    localStorage.clear();
    window.location.reload();
  }

  endEventClicked(): void {
    // this.showEndEventConfirmation = true;
  }
}
