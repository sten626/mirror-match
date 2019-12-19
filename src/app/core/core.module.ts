import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '@app/core/components';

const COMPONENTS = [
  FooterComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class CoreModule {}
