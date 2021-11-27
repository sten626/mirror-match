import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import {
  BottomNavComponent,
  BottomSheetComponent,
  PageNotFoundComponent
} from '@mm/core/components';
import { SharedModule } from '@mm/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    PortalModule,
    RouterModule,
    SharedModule
  ],
  declarations: [BottomNavComponent, BottomSheetComponent, PageNotFoundComponent],
  exports: [BottomNavComponent, PageNotFoundComponent]
})
export class CoreModule {}
