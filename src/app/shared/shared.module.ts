import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FabComponent } from '@app/shared/components';
import { PairingsFilterPipe, SortStandingsPipe } from '@app/shared/pipes';

@NgModule({
  imports: [CommonModule, MatButtonModule, ReactiveFormsModule],
  exports: [
    CommonModule,
    FabComponent,
    MatButtonModule,
    PairingsFilterPipe,
    ReactiveFormsModule,
    SortStandingsPipe
  ],
  declarations: [FabComponent, PairingsFilterPipe, SortStandingsPipe]
})
export class SharedModule {}
