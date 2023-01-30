import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  AddPlayersPageComponent,
  SetupPageComponent,
} from '@mm/setup/containers';
import { SetupRoutingModule } from './setup-routing.module';

@NgModule({
  declarations: [AddPlayersPageComponent, SetupPageComponent],
  imports: [CommonModule, SetupRoutingModule],
})
export class SetupModule {}
