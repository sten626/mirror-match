import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AddPlayersPageComponent,
  SetupPageComponent,
} from '@mm/setup/containers';
import { SharedModule } from '@mm/shared/shared.module';
import { SetupRoutingModule } from './setup-routing.module';

@NgModule({
  declarations: [AddPlayersPageComponent, SetupPageComponent],
  imports: [CommonModule, SetupRoutingModule, SharedModule],
})
export class SetupModule {}
