import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PodsPageComponent } from '@app/pods/containers';
import { PodsRoutingModule } from '@app/pods/pods-routing.module';

const CONTAINERS = [PodsPageComponent];

@NgModule({
  declarations: [CONTAINERS],
  imports: [
    CommonModule,
    PodsRoutingModule
  ]
})
export class PodsModule { }
