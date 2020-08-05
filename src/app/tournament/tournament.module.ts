import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@mm/material';
import { SharedModule } from '@mm/shared/shared.module';
import {
  PlayerEditDialogComponent,
  PlayerFormComponent,
  PodDetailComponent,
  PodsComponent,
  TournamentStartDialogComponent
} from '@mm/tournament/components';
import {
  PodsPageComponent,
  SetupPageComponent
} from '@mm/tournament/containers';
import { PodEffects } from '@mm/tournament/effects';
import * as fromPods from '@mm/tournament/reducers/pods.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

const COMPONENTS = [
  PlayerEditDialogComponent,
  PlayerFormComponent,
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
