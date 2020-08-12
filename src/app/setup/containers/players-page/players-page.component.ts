import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BottomSheetService } from '@mm/core/services';
import * as fromRoot from '@mm/reducers';
import { PlayerSheetComponent } from '@mm/setup/components';
import { Player } from '@mm/shared/models';
import { PlayersPageActions } from '@mm/tournament/actions';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'mm-players-page',
  templateUrl: './players-page.component.html',
  styleUrls: ['./players-page.component.scss']
})
export class PlayersPageComponent implements OnInit, OnDestroy {
  hasPlayers$: Observable<boolean>;
  isXSmallDisplay$: Observable<boolean>;
  playerNames: Set<string>;
  playerNamesSub: Subscription;
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

    this.hasPlayers$ = this.players$.pipe(map((players) => players.length > 0));

    this.useMiniFab$ = this.breakpointObserver
      .observe('(max-width: 460px)') // According to https://material.io/components/buttons-floating-action-button#anatomy
      .pipe(map((result) => result.matches));
  }

  ngOnInit() {
    this.playerNamesSub = this.store
      .pipe(select(fromRoot.selectPlayerNamesLowerCaseSet))
      .subscribe((playerNames) => (this.playerNames = playerNames));
  }

  ngOnDestroy() {
    this.playerNamesSub.unsubscribe();
  }

  addPlayerClicked() {
    const bottomSheetRef = this.bottomSheet.open(PlayerSheetComponent, {
      data: { playerNames: this.playerNames }
    });

    bottomSheetRef.afterDismissed().subscribe((result) => {
      if (result) {
        const player: Player = {
          name: result,
          dropped: false
        };
        this.store.dispatch(PlayersPageActions.addPlayer({ player }));
      }
    });
  }

  editPlayer(player: Player) {
    const playerNames = this.playerNames;
    playerNames.delete(player.name.toLowerCase());

    this.bottomSheet.open(PlayerSheetComponent, {
      data: {
        player,
        playerNames
      }
    });
  }
}
