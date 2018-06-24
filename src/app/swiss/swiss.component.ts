import { Component, OnInit } from '@angular/core';

import { Message, MessageService, PlayerService, RoundService } from '../shared';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './swiss.component.html'
})
export class SwissComponent implements OnInit {
  messages: Message[] = [];
  hasCompletedRounds = false;
  isTournamentStarted$: Observable<boolean>;
  numberOfActivePlayers: number;

  constructor(
    private messageService: MessageService,
    private playerService: PlayerService,
    private roundService: RoundService
  ) {
    this.isTournamentStarted$ = roundService.isTournamentStarted$;
  }

  ngOnInit() {
    this.messageService.messages.subscribe((message: Message) => {
      this.messages.push(message);
    });
    // this.roundService.hasBegunTournament.subscribe((hasBegun: boolean) => this.hasTournamentBegun = hasBegun);
    // this.roundService.hasCompletedRounds.subscribe((hasCompletedRounds: boolean) => this.hasCompletedRounds = hasCompletedRounds);
    // this.playerService.numberOfActivePlayers.subscribe((numPlayers: number) => this.numberOfActivePlayers = numPlayers);
  }

  dismissMessage(message: Message): void {
    const messageIndex = this.messages.indexOf(message);
    this.messages.splice(messageIndex, 1);
  }
}
