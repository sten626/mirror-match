import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { BottomSheetService } from '@app/core/services';
import * as fromRoot from '@app/reducers';
import { Player } from '@app/shared/models';
import { PlayersPageActions } from '@app/tournament/actions';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'mm-players-page',
  templateUrl: './players-page.component.html',
  styleUrls: ['./players-page.component.scss']
})
export class PlayersPageComponent {
  isAddingPlayer = false;
  isXSmallDisplay$: Observable<boolean>;
  playerNames$: Observable<Set<string>>;
  players$: Observable<Player[]>;
  useMiniFab$: Observable<boolean>;

  constructor(
    private bottomSheet: BottomSheetService,
    private breakpointObserver: BreakpointObserver,
    private store: Store<fromRoot.State>
  ) {
    this.isXSmallDisplay$ = this.breakpointObserver
      .observe(Breakpoints.XSmall)
      .pipe(map((result) => result.matches));

    this.players$ = this.store.pipe(select(fromRoot.selectAllPlayers));

    this.playerNames$ = this.store.pipe(
      select(fromRoot.selectPlayerNamesLowerCaseSet)
    );

    this.useMiniFab$ = this.breakpointObserver
      .observe('(max-width: 460px)') // According to https://material.io/components/buttons-floating-action-button#anatomy
      .pipe(map((result) => result.matches));
  }

  addPlayerClicked() {
    // this.isAddingPlayer = true;
    this.bottomSheet.open();
  }

  onAddPlayer(playerName: string) {
    if (!playerName) {
      return;
    }

    const player: Player = {
      name: playerName,
      dropped: false
    };
    this.store.dispatch(PlayersPageActions.addPlayer({ player }));
    this.isAddingPlayer = false;
  }
}
