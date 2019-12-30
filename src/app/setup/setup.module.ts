import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { PlayerEditDialogComponent, PlayerFormComponent, PlayersListComponent, PlayersListItemComponent } from '@app/setup/components';
import { PlayersPageComponent, SetupPageComponent } from '@app/setup/containers';
import { SetupRoutingModule } from '@app/setup/setup-routing.module';

const COMPONENTS = [
  PlayerEditDialogComponent,
  PlayerFormComponent,
  PlayersListComponent,
  PlayersListItemComponent
];

const CONTAINERS = [
  PlayersPageComponent,
  SetupPageComponent
];

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    SetupRoutingModule
  ],
  declarations: [
    COMPONENTS,
    CONTAINERS
  ],
  entryComponents: [
    PlayerEditDialogComponent
  ]
})
export class SetupModule {}
