import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '@mm/core/components';
import { SharedModule } from '@mm/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    // MatCardModule,
    // MatIconModule,
    // MatToolbarModule,
    // PortalModule,
    RouterModule,
    SharedModule
  ],
  declarations: [PageNotFoundComponent],
  exports: [PageNotFoundComponent]
})
export class CoreModule {}
