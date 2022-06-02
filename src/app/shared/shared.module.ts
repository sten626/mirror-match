import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TopAppBarComponent } from './components';

// const COMPONENTS = [FabComponent, NavigationBarComponent, SearchBoxComponent];
// const DIRECTIVES = [AutofocusDirective, BottomSheetContentDirective];
// const MOLECULES = [AlertDialogComponent, EditableTextComponent];
// const PIPES = [PairingsFilterPipe, SortStandingsPipe];

@NgModule({
  imports: [CommonModule],
  declarations: [TopAppBarComponent],
  exports: [TopAppBarComponent],
  // declarations: [DIRECTIVES, MOLECULES, PIPES],
  // exports: [DIRECTIVES, MOLECULES, PIPES]
})
export class SharedModule {}
