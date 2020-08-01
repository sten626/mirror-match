import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@mm/material';
import { FabComponent } from '@mm/shared/components';
import { PairingsFilterPipe, SortStandingsPipe } from '@mm/shared/pipes';
import { BottomSheetContentDirective } from './directives/bottom-sheet-content.directive';

const COMPONENTS = [FabComponent];
const PIPES = [PairingsFilterPipe, SortStandingsPipe];

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [COMPONENTS, PIPES, BottomSheetContentDirective],
  exports: [COMPONENTS, PIPES, BottomSheetContentDirective]
})
export class SharedModule {}
