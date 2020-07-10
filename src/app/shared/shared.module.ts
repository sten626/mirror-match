import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/material';
import { FabComponent } from '@app/shared/components';
import { PairingsFilterPipe, SortStandingsPipe } from '@app/shared/pipes';

const COMPONENTS = [FabComponent];

@NgModule({
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  declarations: [COMPONENTS, PairingsFilterPipe, SortStandingsPipe],
  exports: [
    CommonModule,
    COMPONENTS,
    MaterialModule,
    PairingsFilterPipe,
    ReactiveFormsModule,
    SortStandingsPipe
  ]
})
export class SharedModule {}
