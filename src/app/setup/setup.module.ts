import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PlayerFormComponent, PlayersListComponent, PlayersListItemComponent } from '@app/setup/components';
import { PlayersPageComponent, SetupPageComponent } from '@app/setup/containers';
import { SetupRoutingModule } from '@app/setup/setup-routing.module';

const COMPONENTS = [
  PlayerFormComponent,
  PlayersListComponent,
  PlayersListItemComponent
];

const CONTAINERS = [
  PlayersPageComponent,
  SetupPageComponent
];

@NgModule({
  declarations: [
    COMPONENTS,
    CONTAINERS
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, // TODO: Should this be here?
    SetupRoutingModule
  ]
})
export class SetupModule {}
