import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as fromRoot from '@app/reducers';
import { SetupPageActions } from '@app/setup/actions';
import {
  PlayerEditDialogComponent,
  TournamentStartDialogComponent
} from '@app/setup/components';
import { Player, TournamentInfo } from '@app/shared/models';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'mm-setup-page',
  templateUrl: './setup-page.component.html',
  styleUrls: ['./setup-page.component.scss']
})
export class SetupPageComponent implements OnInit, OnDestroy {
  activePlayerIds: number[];
  activePlayerIdsSub: Subscription;
  canBeginTournament$: Observable<boolean>;
  hasAnythingStarted = false;
  hasAnythingStartedSub: Subscription;
  players$: Observable<Player[]>;
  recommendedTotalRounds: number;
  recommendedTotalRoundsSub: Subscription;

  constructor(private dialog: MatDialog, private store: Store<fromRoot.State>) {
    this.canBeginTournament$ = this.store.pipe(
      select(fromRoot.canBeginTournament)
    );

    this.players$ = this.store.pipe(
      select(fromRoot.selectAllPlayers),
      map((players) => players.slice().reverse())
    );
  }

  ngOnInit() {
    this.activePlayerIdsSub = this.store
      .pipe(select(fromRoot.selectActivePlayerIds))
      .subscribe((activePlayerIds) => (this.activePlayerIds = activePlayerIds));
    this.hasAnythingStartedSub = this.store
      .pipe(select(fromRoot.hasAnythingStarted))
      .subscribe(
        (hasAnythingStarted) => (this.hasAnythingStarted = hasAnythingStarted)
      );
    this.recommendedTotalRoundsSub = this.store
      .pipe(select(fromRoot.selectRecommendedTotalRounds))
      .subscribe((value) => (this.recommendedTotalRounds = value));
  }

  ngOnDestroy() {
    this.activePlayerIdsSub.unsubscribe();
    this.hasAnythingStartedSub.unsubscribe();
    this.recommendedTotalRoundsSub.unsubscribe();
  }

  onAddPlayer(name: string) {
    const player: Player = {
      id: null,
      name: name,
      dropped: false
    };
    this.store.dispatch(SetupPageActions.addPlayer({ player }));
  }

  onEditPlayer(event: { player: Player; otherPlayers: Player[] }) {
    const { player, otherPlayers } = event;
    const dialogRef = this.dialog.open(PlayerEditDialogComponent, {
      data: {
        player: player,
        otherPlayers: otherPlayers
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const { name, dropped } = result;

        if (dropped && !this.hasAnythingStarted) {
          this.store.dispatch(
            SetupPageActions.deletePlayer({
              id: player.id
            })
          );
        } else {
          this.store.dispatch(
            SetupPageActions.updatePlayer({
              player: {
                id: player.id,
                changes: { name, dropped }
              }
            })
          );
        }
      }
    });
  }

  onStartClicked() {
    const dialogRef = this.dialog.open(TournamentStartDialogComponent, {
      data: {
        recommendedTotalRounds: this.recommendedTotalRounds
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const formBestOf = parseInt(result.bestOf);
        const isDraft: boolean = result.isDraft;
        const totalRounds: number = result.totalRounds;
        let bestOf: 1 | 3 = 3;

        switch (formBestOf) {
          case 1: {
            bestOf = 1;
            break;
          }
          default: {
            bestOf = 3;
          }
        }

        const tournamentInfo: TournamentInfo = {
          bestOf,
          hasDraftStarted: isDraft,
          hasSwissStarted: !isDraft,
          isDraft,
          totalRounds
        };

        this.store.dispatch(
          SetupPageActions.startTournament({ tournamentInfo })
        );
      }
    });
  }
}
