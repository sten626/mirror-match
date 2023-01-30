import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PlayersRoutingModule } from '@mm/players/players-routing.module';
import { SharedModule } from '@mm/shared/shared.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PlayersRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class PlayersModule {}
