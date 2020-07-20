import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AddPlayerSheetComponent } from '@app/setup/components';
import {
  PlayersPageComponent,
  SetupPageComponent
} from '@app/setup/containers';
import { SetupRoutingModule } from '@app/setup/setup-routing.module';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    AddPlayerSheetComponent,
    PlayersPageComponent,
    SetupPageComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    SetupRoutingModule,
    SharedModule
  ]
})
export class SetupModule {}
