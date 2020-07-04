import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { PodDetailComponent, PodsComponent } from '@app/pods/components';
import { PodsPageComponent } from '@app/pods/containers';
import { PodEffects } from '@app/pods/effects/pod.effects';
import { PodsRoutingModule } from '@app/pods/pods-routing.module';
import * as fromPods from '@app/pods/reducers/pods.reducer';
import { SharedModule } from '@app/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

const COMPONENTS = [PodDetailComponent, PodsComponent];
const CONTAINERS = [PodsPageComponent];

@NgModule({
  declarations: [COMPONENTS, CONTAINERS],
  imports: [
    EffectsModule.forFeature([PodEffects]),
    MatCardModule,
    MatExpansionModule,
    MatTableModule,
    PodsRoutingModule,
    SharedModule,
    StoreModule.forFeature(fromPods.podsFeatureKey, fromPods.reducer)
  ]
})
export class PodsModule {}
