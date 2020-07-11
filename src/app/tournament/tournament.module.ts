import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material';
import { SharedModule } from '@app/shared/shared.module';
import {
  PlayerEditDialogComponent,
  PlayerFormComponent,
  PlayersListComponent,
  PodDetailComponent,
  PodsComponent,
  TournamentStartDialogComponent
} from '@app/tournament/components';
import {
  PodsPageComponent,
  SetupPageComponent
} from '@app/tournament/containers';
import {
  PlayerEffects,
  PodEffects,
  TournamentEffects
} from '@app/tournament/effects';
import * as fromTournament from '@app/tournament/reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

const COMPONENTS = [
  PlayerEditDialogComponent,
  PlayerFormComponent,
  PlayersListComponent,
  PodDetailComponent,
  PodsComponent,
  TournamentStartDialogComponent
];

const CONTAINERS = [PodsPageComponent, SetupPageComponent];

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([PlayerEffects, PodEffects, TournamentEffects]),
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature(
      fromTournament.tournamentFeatureKey,
      fromTournament.reducers
    )
  ],
  declarations: [COMPONENTS, CONTAINERS]
})
export class TournamentModule {}
