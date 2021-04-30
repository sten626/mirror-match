import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  NewPlayerListItemComponent,
  PlayersListComponent,
  PlayersListItemComponent,
  SetupFooterComponent
} from '@mm/players/components';
import { PlayersPageComponent } from '@mm/players/containers';
import { PlayersRoutingModule } from '@mm/players/players-routing.module';
import { SharedModule } from '@mm/shared/shared.module';

@NgModule({
  declarations: [
    NewPlayerListItemComponent,
    PlayersListComponent,
    PlayersListItemComponent,
    PlayersPageComponent,
    SetupFooterComponent
  ],
  imports: [
    CommonModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSnackBarModule,
    MatToolbarModule,
    PlayersRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class PlayersModule {}
