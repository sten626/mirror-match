import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as fromRoot from '@mm/reducers';
import { SetupPageActions } from '@mm/setup/actions';
import { Player } from '@mm/shared/models';
import { AlertDialogComponent, AlertDialogData } from '@mm/shared/molecules';
import { Update } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'mm-setup-page',
  templateUrl: './setup-page.component.html',
  styleUrls: ['./setup-page.component.scss']
})
export class SetupPageComponent {
  isAdding = false;
  players$: Observable<Player[]>;

  constructor(private dialog: MatDialog, private store: Store<fromRoot.State>) {
    this.players$ = this.store.pipe(select(fromRoot.selectAllPlayers));
  }

  deletePlayer(id: number) {
    this.store.dispatch(SetupPageActions.deletePlayer({ id }));
  }

  onAdd() {
    this.isAdding = true;
  }

  onCancel() {
    this.isAdding = false;
  }

  deleteAllPlayers() {
    const data: AlertDialogData = {
      title: 'Delete all players?',
      content: 'This will delete all registered players and cannot be undone.',
      confirmButtonText: 'Delete All'
    };
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data,
      autoFocus: false
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.store.dispatch(SetupPageActions.clearPlayers());
      }
    });
  }

  startAdding() {
    this.isAdding = true;
  }

  stopAdding() {
    this.isAdding = false;
  }

  playerChanged(update: Update<Player>) {
    this.store.dispatch(SetupPageActions.updatePlayer({ update }));
  }
}
