import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
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
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatExpansionModule,
    MatRadioModule,
    MatTableModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature(fromPods.podsFeatureKey, fromPods.reducer)
  ],
  declarations: [COMPONENTS, CONTAINERS]
})
export class TournamentModule {}
