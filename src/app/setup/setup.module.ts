import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  PlayersPageComponent,
  SetupPageComponent
} from '@app/setup/containers';
import { SetupRoutingModule } from '@app/setup/setup-routing.module';

const CONTAINERS = [PlayersPageComponent, SetupPageComponent];

@NgModule({
  declarations: [CONTAINERS],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    SetupRoutingModule
  ]
})
export class SetupModule {}
