import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  PlayerSheetComponent,
  PlayersListComponent,
  PlayersToolbarComponent,
  SetupSideSheetComponent,
  StartEventFormComponent
} from '@mm/setup/components';
import { PlayersPageComponent, SetupPageComponent } from '@mm/setup/containers';
import { SetupRoutingModule } from '@mm/setup/setup-routing.module';
import { SharedModule } from '@mm/shared/shared.module';

@NgModule({
  declarations: [
    PlayerSheetComponent,
    PlayersListComponent,
    PlayersPageComponent,
    PlayersToolbarComponent,
    SetupPageComponent,
    SetupSideSheetComponent,
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
    MatSidenavModule,
    MatSlideToggleModule,
    MatToolbarModule,
    ReactiveFormsModule,
    SetupRoutingModule,
    SharedModule
  ]
})
export class SetupModule {}
