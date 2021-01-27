import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SetupFooterComponent } from '@mm/setup/organisms';
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
    SetupFooterComponent,
    SetupPageComponent
    // SetupSideSheetComponent,
    // StartEventFormComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    // MatFormFieldModule,
    MatIconModule,
    // MatInputModule,
    // MatListModule,
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
