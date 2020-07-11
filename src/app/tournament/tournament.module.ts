import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material';
import { SharedModule } from '@app/shared/shared.module';
import {
  PlayerEditDialogComponent,
  PlayerFormComponent,
  PlayersListComponent,
  TournamentStartDialogComponent
} from '@app/tournament/components';
import { SetupPageComponent } from '@app/tournament/containers';
import { TournamentRoutingModule } from '@app/tournament/tournament-routing.module';

const COMPONENTS = [
  PlayerEditDialogComponent,
  PlayerFormComponent,
  PlayersListComponent,
  TournamentStartDialogComponent
];

const CONTAINERS = [SetupPageComponent];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    TournamentRoutingModule
  ],
  declarations: [COMPONENTS, CONTAINERS]
})
export class TournamentModule {}
