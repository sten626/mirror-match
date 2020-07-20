import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@app/material';
import { BottomSheetComponent, FabComponent } from '@app/shared/components';
import { PairingsFilterPipe, SortStandingsPipe } from '@app/shared/pipes';

const COMPONENTS = [BottomSheetComponent, FabComponent];
const PIPES = [PairingsFilterPipe, SortStandingsPipe];

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [COMPONENTS, PIPES],
  exports: [COMPONENTS, PIPES]
})
export class SharedModule {}
