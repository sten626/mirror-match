import { Component, OnInit } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Pairing, PairingService, Player, PlayerService, StandingsService } from '../shared';

@Component({
  templateUrl: './swiss-standings.component.html'
})
export class SwissStandingsComponent implements OnInit {
  standings: Player[];

  constructor(
    private pairingService: PairingService,
    private playerService: PlayerService,
    private standingsService: StandingsService
  ) {}

  ngOnInit() {
    this.playerService.loadPlayers();
    this.pairingService.loadPairings();
    combineLatest(this.playerService.players$,
      this.pairingService.submittedPairings$
    ).subscribe(([players, pairings]) => {
      this.standings = this.standingsService.getStandings(players, pairings);
    });
  }
}
