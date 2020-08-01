import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BottomSheetComponent,
  PageNotFoundComponent,
  ToolbarComponent
} from '@mm/core/components';
import { MaterialModule } from '@mm/material';
import { SharedModule } from '@mm/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    PortalModule,
    RouterModule,
    SharedModule
  ],
  declarations: [BottomSheetComponent, PageNotFoundComponent, ToolbarComponent],
  exports: [PageNotFoundComponent]
})
export class CoreModule {}
