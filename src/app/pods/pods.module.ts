import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PodsPageComponent } from '@app/pods/containers';
import { PodEffects } from '@app/pods/effects/pod.effects';
import { PodsRoutingModule } from '@app/pods/pods-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as fromPods from '@app/pods/reducers/pods.reducer';

const CONTAINERS = [PodsPageComponent];

@NgModule({
  declarations: [CONTAINERS],
  imports: [
    CommonModule,
    PodsRoutingModule,
    EffectsModule.forFeature([PodEffects]),
    StoreModule.forFeature(fromPods.podsFeatureKey, fromPods.reducer)
  ]
})
export class PodsModule {}
