import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { FooterComponent, HeaderComponent } from '@app/core/components';

const COMPONENTS = [
  FooterComponent,
  HeaderComponent
];

@NgModule({
  imports: [
    CommonModule,
    MatTabsModule,
    MatToolbarModule,
    RouterModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class CoreModule {}
