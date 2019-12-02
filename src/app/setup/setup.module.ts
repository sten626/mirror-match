import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PlayerFormComponent } from '@app/setup/components/player-form/player-form.component';
import { PlayersPageComponent, SetupPageComponent } from '@app/setup/containers';
import { SetupRoutingModule } from '@app/setup/setup-routing.module';

@NgModule({
  declarations: [
    SetupPageComponent,
    PlayersPageComponent,
    PlayerFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, // TODO: Should this be here?
    SetupRoutingModule
  ]
})
export class SetupModule {}
