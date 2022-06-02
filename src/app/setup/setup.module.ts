import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@mm/shared/shared.module';
import { SetupRoutingModule } from './setup-routing.module';
import { SetupComponent } from './setup.component';

@NgModule({
  declarations: [SetupComponent],
  imports: [CommonModule, SetupRoutingModule, SharedModule],
})
export class SetupModule {}
