import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent, HeaderComponent } from 'app/core/components';

const COMPONENTS = [
  FooterComponent,
  HeaderComponent
];

@NgModule({
  declarations: COMPONENTS,
  exports: COMPONENTS,
  imports: [
    CommonModule,
    NgbModule
  ]
})
export class CoreModule {}
