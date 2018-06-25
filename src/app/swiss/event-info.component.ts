import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PlayerService, RoundService, PairingService } from '../shared';

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
  showEndEventConfirmation = false;

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
