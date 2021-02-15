import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NewPlayerListItemComponent } from '@mm/setup/molecules';
import {
  NewPlayerSheetComponent,
  PlayersListComponent,
  SetupFooterComponent,
  SetupHeaderComponent
} from '@mm/setup/organisms';
import { SetupPageComponent } from '@mm/setup/pages';
import { SetupRoutingModule } from '@mm/setup/setup-routing.module';
import { SharedModule } from '@mm/shared/shared.module';

@NgModule({
  declarations: [
    // AddPlayerListItemComponent,
    // PlayerNameInputDirective,
    // PlayerSheetComponent,
    // PlayersListComponent,
    // PlayerListItemComponent,
    // PlayersPageComponent,
    // PlayersToolbarComponent,
    NewPlayerListItemComponent,
    NewPlayerSheetComponent,
    PlayersListComponent,
    SetupFooterComponent,
    SetupHeaderComponent,
    SetupPageComponent
    // SetupSideSheetComponent,
    // StartEventFormComponent,
  ],
  imports: [
    CommonModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    // MatRadioModule,
    // MatSlideToggleModule,
    // MatSnackBarModule,
    MatToolbarModule,
    ReactiveFormsModule,
    SetupRoutingModule,
    SharedModule
  ]
})
export class SetupModule {}
