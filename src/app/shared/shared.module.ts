import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@app/material';
import { FabComponent } from '@app/shared/components';
import { PairingsFilterPipe, SortStandingsPipe } from '@app/shared/pipes';

const COMPONENTS = [FabComponent];

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [COMPONENTS, PairingsFilterPipe, SortStandingsPipe],
  exports: [COMPONENTS, PairingsFilterPipe, SortStandingsPipe]
})
export class SharedModule {}
