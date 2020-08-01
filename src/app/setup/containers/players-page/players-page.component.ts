import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BottomSheetService } from '@app/core/services';
import * as fromRoot from '@app/reducers';
import { AddPlayerFormComponent } from '@app/setup/components';
import { Player } from '@app/shared/models';
import { PlayersPageActions } from '@app/tournament/actions';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'mm-players-page',
  templateUrl: './players-page.component.html',
  styleUrls: ['./players-page.component.scss']
})
export class PlayersPageComponent implements OnInit, OnDestroy {
  isAddingPlayer = false;
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
    const bottomSheetRef = this.bottomSheet.open(AddPlayerFormComponent, {
      data: { playerNames: this.playerNames }
    });

    bottomSheetRef.afterDismissed().subscribe((result) => {
      if (result) {
        const player: Player = {
          name: result,
          dropped: false
        };
        this.store.dispatch(PlayersPageActions.addPlayer({ player }));
        this.isAddingPlayer = false;
      }
    });
    // this.bottomSheet.open(AddPlayerFormComponent, {
    //   data: { playerNames: this.playerNames }
    // });
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
