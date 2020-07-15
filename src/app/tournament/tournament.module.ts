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
import { PodEffects } from '@app/tournament/effects';
import * as fromPods from '@app/tournament/reducers/pods.reducer';
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
    EffectsModule.forFeature([PodEffects]),
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature(fromPods.podsFeatureKey, fromPods.reducer)
  ],
  declarations: [COMPONENTS, CONTAINERS]
})
export class TournamentModule {}
