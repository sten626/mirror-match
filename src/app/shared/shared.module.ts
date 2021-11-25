import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@mm/material';
import {
  FabComponent,
  NavigationBarComponent,
  SearchBoxComponent
} from '@mm/shared/components';
import {
  AutofocusDirective,
  BottomSheetContentDirective
} from '@mm/shared/directives';
import {
  AlertDialogComponent,
  EditableTextComponent
} from '@mm/shared/molecules';
import { PairingsFilterPipe, SortStandingsPipe } from '@mm/shared/pipes';

const COMPONENTS = [FabComponent, NavigationBarComponent, SearchBoxComponent];
const DIRECTIVES = [AutofocusDirective, BottomSheetContentDirective];
const MOLECULES = [AlertDialogComponent, EditableTextComponent];
const PIPES = [PairingsFilterPipe, SortStandingsPipe];

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [COMPONENTS, DIRECTIVES, MOLECULES, PIPES],
  exports: [COMPONENTS, DIRECTIVES, MOLECULES, PIPES]
})
export class SharedModule {}
