import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import * as fromRoot from '@mm/reducers';
import { SetupPageActions } from '@mm/setup/actions';
import { NewPlayerSheetComponent } from '@mm/setup/organisms';
import { Player } from '@mm/shared/models';
import { AlertDialogComponent, AlertDialogData } from '@mm/shared/molecules';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'mm-setup-page',
  templateUrl: './setup-page.component.html',
  styleUrls: ['./setup-page.component.scss']
})
export class SetupPageComponent {
  players$: Observable<Player[]>;

  constructor(
    private bottomSheet: MatBottomSheet,
    private dialog: MatDialog,
    private store: Store<fromRoot.State>
  ) {
    this.players$ = this.store.pipe(select(fromRoot.selectAllPlayers));
  }

  onAdd() {
    const bottomSheetRef = this.bottomSheet.open(NewPlayerSheetComponent, {
      autoFocus: true
    });

    bottomSheetRef.afterDismissed().subscribe((name) => {
      const player: Player = {
        name,
        dropped: false
      };
      this.store.dispatch(SetupPageActions.addPlayer({ player }));
    });
  }

  onDeleteAll() {
    const data: AlertDialogData = {
      title: 'Delete all players?',
      content: 'This will delete all registered players and cannot be undone.',
      confirmButtonText: 'Delete All'
    };
    const dialogRef = this.dialog.open(AlertDialogComponent, { data });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(SetupPageActions.clearPlayers());
      }
    });
  }
}
