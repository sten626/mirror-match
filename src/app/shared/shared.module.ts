import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SegmentedButtonComponent, TopAppBarComponent } from './components';

@NgModule({
  declarations: [SegmentedButtonComponent, TopAppBarComponent],
  imports: [CommonModule],
  exports: [SegmentedButtonComponent, TopAppBarComponent],
})
export class SharedModule {}
