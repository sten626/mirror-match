import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PlayerEditDialogComponent, PlayerFormComponent, PlayersListComponent, PlayersListItemComponent, TournamentStartDialogComponent } from '@app/setup/components';
import { PlayersPageComponent, SetupPageComponent } from '@app/setup/containers';
import { SetupRoutingModule } from '@app/setup/setup-routing.module';

const COMPONENTS = [
  PlayerEditDialogComponent,
  PlayerFormComponent,
  PlayersListComponent,
  PlayersListItemComponent,
  TournamentStartDialogComponent
];

const CONTAINERS = [
  PlayersPageComponent,
  SetupPageComponent
];

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    SetupRoutingModule
  ],
  declarations: [
    COMPONENTS,
    CONTAINERS
  ],
  entryComponents: [
    PlayerEditDialogComponent,
    TournamentStartDialogComponent
  ]
})
export class SetupModule {}
