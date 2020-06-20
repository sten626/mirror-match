import { Component } from '@angular/core';
import { MessageActions } from '@app/core/actions';
import { Message } from '@app/shared/models';
import * as fromSwiss from '@app/swiss/reducers';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './swiss.component.html'
})
export class SwissComponent {
  hasCompletedRounds$: Observable<boolean>;
  hasTournamentStarted$: Observable<boolean>;
  messages$: Observable<Message[]>;
  numberOfActivePlayers$: Observable<number>;

  constructor(
    private store: Store<fromSwiss.State>
  ) {
    this.hasCompletedRounds$ = this.store.pipe(
      select(fromSwiss.hasCompletedRounds)
    );
    this.hasTournamentStarted$ = this.store.pipe(
      select(fromSwiss.hasTournamentStarted)
    );
    // this.messages$ = this.store.pipe(
    //   select(fromRoot.getMessages)
    // );
    // this.numberOfActivePlayers$ = this.store.pipe(
    //   select(fromSwiss.getTotalActivePlayers)
    // );
  }

  dismissMessage(message: Message): void {
    this.store.dispatch(MessageActions.deleteMessage({message}));
  }
}
