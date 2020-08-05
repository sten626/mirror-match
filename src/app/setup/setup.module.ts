import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  AddPlayerFormComponent,
  PlayersListComponent
} from '@mm/setup/components';
import {
  EditPlayerPageComponent,
  PlayersPageComponent,
  SetupPageComponent
} from '@mm/setup/containers';
import { SetupRoutingModule } from '@mm/setup/setup-routing.module';
import { SharedModule } from '@mm/shared/shared.module';

@NgModule({
  declarations: [
    AddPlayerFormComponent,
    EditPlayerPageComponent,
    PlayersListComponent,
    PlayersPageComponent,
    SetupPageComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    ReactiveFormsModule,
    SetupRoutingModule,
    SharedModule
  ]
})
export class SetupModule {}
