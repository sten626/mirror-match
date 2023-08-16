import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@mm/shared/shared.module';
import { StartComponent } from './components';
import { AddPlayersPageComponent, SetupPageComponent } from './containers';
import { SetupRoutingModule } from './setup-routing.module';

@NgModule({
  declarations: [AddPlayersPageComponent, SetupPageComponent, StartComponent],
  imports: [CommonModule, SetupRoutingModule, SharedModule],
})
export class SetupModule {}
