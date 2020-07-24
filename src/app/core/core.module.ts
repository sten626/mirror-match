import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BottomSheetContainerComponent,
  PageNotFoundComponent,
  ToolbarComponent
} from '@app/core/components';
import { MaterialModule } from '@app/material';
import { SharedModule } from '@app/shared/shared.module';

const COMPONENTS = [
  BottomSheetContainerComponent,
  PageNotFoundComponent,
  ToolbarComponent
];

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule, SharedModule],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class CoreModule {}
