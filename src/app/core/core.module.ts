import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BottomSheetComponent,
  PageNotFoundComponent,
  ToolbarComponent
} from '@app/core/components';
import { MaterialModule } from '@app/material';
import { SharedModule } from '@app/shared/shared.module';

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
