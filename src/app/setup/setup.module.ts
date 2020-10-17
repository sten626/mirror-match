import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  AddPlayerListItemComponent,
  PlayerNameInputDirective,
  PlayerSheetComponent,
  PlayersListComponent,
  PlayersToolbarComponent,
  SetupSideSheetComponent,
  SetupToolbarComponent,
  StartEventFormComponent
} from '@mm/setup/components';
import { PlayersPageComponent, SetupPageComponent } from '@mm/setup/containers';
import { SetupRoutingModule } from '@mm/setup/setup-routing.module';
import { SharedModule } from '@mm/shared/shared.module';

@NgModule({
  declarations: [
    AddPlayerListItemComponent,
    PlayerNameInputDirective,
    PlayerSheetComponent,
    PlayersListComponent,
    PlayersPageComponent,
    PlayersToolbarComponent,
    SetupPageComponent,
    SetupSideSheetComponent,
    SetupToolbarComponent,
    StartEventFormComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatToolbarModule,
    ReactiveFormsModule,
    SetupRoutingModule,
    SharedModule
  ]
})
export class SetupModule {}
