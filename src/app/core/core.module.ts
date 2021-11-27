import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import {
  BottomSheetComponent,
  PageNotFoundComponent
} from '@mm/core/components';
import { SharedModule } from '@mm/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    PortalModule,
    RouterModule,
    SharedModule
  ],
  declarations: [BottomSheetComponent, PageNotFoundComponent],
  exports: [PageNotFoundComponent]
})
export class CoreModule {}
