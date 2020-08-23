import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BottomSheetService } from '@mm/core/services';
import * as fromRoot from '@mm/reducers';
import { PlayersPageActions } from '@mm/setup/actions';
import { PlayerSheetComponent } from '@mm/setup/components';
import { Player } from '@mm/shared/models';
import { Update } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'mm-players-page',
  templateUrl: './players-page.component.html',
  styleUrls: ['./players-page.component.scss']
})
export class PlayersPageComponent implements OnInit, OnDestroy {
  hasPlayers$: Observable<boolean>;
  playerNames: Set<string>;
  playerNamesSub: Subscription;
  players$: Observable<Player[]>;
  useMiniFab$: Observable<boolean>;

  private searchQuery = new BehaviorSubject<string>('');

  constructor(
    private bottomSheet: BottomSheetService,
    private breakpointObserver: BreakpointObserver,
    private store: Store<fromRoot.State>
  ) {
    const allPlayers$ = this.store.pipe(select(fromRoot.selectAllPlayers));
    this.players$ = combineLatest([allPlayers$, this.searchQuery]).pipe(
      map(([players, query]) => {
        if (!query) {
          return players;
        }

        const queryLowered = query.toLowerCase();

        return players.filter((player) =>
          player.name.toLowerCase().includes(queryLowered)
        );
      })
    );

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

    const bottomSheetRef = this.bottomSheet.open(PlayerSheetComponent, {
      data: {
        player,
        playerNames
      }
    });

    bottomSheetRef.afterDismissed().subscribe((result: Update<Player>) => {
      if (result) {
        if (result.changes.dropped) {
          // Since this is during setup, dropping a player can just remove them from the tournament.
          this.store.dispatch(
            PlayersPageActions.deletePlayer({ id: result.id as number })
          );
        } else {
          this.store.dispatch(
            PlayersPageActions.updatePlayer({ player: result })
          );
        }
      }
    });
  }

  onSearch(query: string) {
    this.searchQuery.next(query);
  }
}
