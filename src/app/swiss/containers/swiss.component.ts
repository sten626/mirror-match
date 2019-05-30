import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Message, MessageService, RoundService } from 'app/shared';
import * as fromSwiss from 'app/swiss/reducers';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './swiss.component.html'
})
export class SwissComponent implements OnInit {
  messages: Message[] = [];
  hasCompletedRounds = false;
  hasTournamentStarted$: Observable<boolean>;
  numberOfActivePlayers$: Observable<number>;

  constructor(
    private messageService: MessageService,
    private roundService: RoundService,
    private store: Store<fromSwiss.State>
  ) {
    this.hasTournamentStarted$ = this.store.pipe(
      select(fromSwiss.hasTournamentStarted)
    );
    this.numberOfActivePlayers$ = this.store.pipe(
      select(fromSwiss.getNumberOfActivePlayers)
    );
  }

  ngOnInit() {
    // this.store.dispatch(new SwissPageActions.LoadPlayers());
    // this.store.dispatch(new SwissPageActions.LoadTournament());
    this.messageService.messages.subscribe((message: Message) => {
      this.messages.push(message);
    });
    this.roundService.hasCompletedRounds$.subscribe((hasCompletedRounds: boolean) => this.hasCompletedRounds = hasCompletedRounds);
  }

  dismissMessage(message: Message): void {
    const messageIndex = this.messages.indexOf(message);
    this.messages.splice(messageIndex, 1);
  }
}
