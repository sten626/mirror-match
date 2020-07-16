import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  AddPlayerComponent,
  PlayersPageComponent,
  SetupPageComponent
} from '@app/setup/containers';
import { SetupRoutingModule } from '@app/setup/setup-routing.module';

@NgModule({
  declarations: [AddPlayerComponent, PlayersPageComponent, SetupPageComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    SetupRoutingModule
  ]
})
export class SetupModule {}
