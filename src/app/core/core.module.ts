import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  BottomSheetComponent,
  PageNotFoundComponent
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
  declarations: [BottomSheetComponent, PageNotFoundComponent],
  exports: [PageNotFoundComponent]
})
export class CoreModule {}
