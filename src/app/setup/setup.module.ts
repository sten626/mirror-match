import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AddPlayerFormComponent } from '@app/setup/components';
import {
  PlayersPageComponent,
  SetupPageComponent
} from '@app/setup/containers';
import { SetupRoutingModule } from '@app/setup/setup-routing.module';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    AddPlayerFormComponent,
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
    ReactiveFormsModule,
    SetupRoutingModule,
    SharedModule
  ]
})
export class SetupModule {}
