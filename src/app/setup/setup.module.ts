import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
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
  imports: [
    CommonModule,
    MatTabsModule,
    ReactiveFormsModule,
    SetupRoutingModule
  ],
  declarations: [
    COMPONENTS,
    CONTAINERS
  ]
})
export class SetupModule {}
