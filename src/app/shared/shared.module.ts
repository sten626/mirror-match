import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
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
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatFormFieldModule],
  declarations: [COMPONENTS, DIRECTIVES, MOLECULES, PIPES],
  exports: [COMPONENTS, DIRECTIVES, MOLECULES, PIPES]
})
export class SharedModule {}
