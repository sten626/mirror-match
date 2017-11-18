import { Component, OnInit } from '@angular/core';

import { Message, MessageService, PlayerService, RoundService } from '../shared';

@Component({
  templateUrl: './swiss.component.html'
})
export class SwissComponent implements OnInit {
  messages: Message[] = [];
  hasCompletedRounds = false;
  hasTournamentBegun = false;
  numberOfPlayers: number;

  constructor(
    private messageService: MessageService,
    private playerService: PlayerService,
    private roundService: RoundService) {}

  ngOnInit() {
    this.messageService.messages.subscribe((message: Message) => {
      this.messages.push(message);
    });
    this.roundService.hasBegunTournament.subscribe((hasBegun: boolean) => this.hasTournamentBegun = hasBegun);
    this.roundService.hasCompletedRounds.subscribe((hasCompletedRounds: boolean) => this.hasCompletedRounds = hasCompletedRounds);
    this.playerService.numberOfPlayers.subscribe((numPlayers: number) => this.numberOfPlayers = numPlayers);
  }

  dismissMessage(message: Message): void {
    const messageIndex = this.messages.indexOf(message);
    this.messages.splice(messageIndex, 1);
  }
}
