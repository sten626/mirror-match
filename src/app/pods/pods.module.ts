import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { PodsComponent } from '@app/pods/components';
import { PodsPageComponent } from '@app/pods/containers';
import { PodEffects } from '@app/pods/effects/pod.effects';
import { PodsRoutingModule } from '@app/pods/pods-routing.module';
import * as fromPods from '@app/pods/reducers/pods.reducer';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

const COMPONENTS = [PodsComponent];
const CONTAINERS = [PodsPageComponent];

@NgModule({
  declarations: [COMPONENTS, CONTAINERS],
  imports: [
    CommonModule,
    MatExpansionModule,
    PodsRoutingModule,
    EffectsModule.forFeature([PodEffects]),
    StoreModule.forFeature(fromPods.podsFeatureKey, fromPods.reducer)
  ]
})
export class PodsModule {}
