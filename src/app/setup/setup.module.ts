import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SetupPageComponent } from '@app/setup/containers/setup-page/setup-page.component';
import { SetupRoutingModule } from '@app/setup/setup-routing.module';
import { PlayersPageComponent } from './components/players-page/players-page.component';
import { PlayerFormComponent } from './components/player-form/player-form.component';

@NgModule({
  declarations: [
    SetupPageComponent,
    PlayersPageComponent,
    PlayerFormComponent
  ],
  imports: [
    CommonModule,
    SetupRoutingModule
  ]
})
export class SetupModule {}
