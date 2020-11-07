import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@mm/material';
import { FabComponent, SearchBoxComponent } from '@mm/shared/components';
import {
  AutofocusDirective,
  BottomSheetContentDirective
} from '@mm/shared/directives';
import { PairingsFilterPipe, SortStandingsPipe } from '@mm/shared/pipes';

const COMPONENTS = [FabComponent, SearchBoxComponent];
const DIRECTIVES = [AutofocusDirective, BottomSheetContentDirective];
const PIPES = [PairingsFilterPipe, SortStandingsPipe];

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [COMPONENTS, DIRECTIVES, PIPES],
  exports: [COMPONENTS, DIRECTIVES, PIPES]
})
export class SharedModule {}
