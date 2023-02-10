import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  SegmentedButtonComponent,
  SwitchComponent,
  TopAppBarComponent,
} from './components';

@NgModule({
  declarations: [SegmentedButtonComponent, SwitchComponent, TopAppBarComponent],
  imports: [CommonModule],
  exports: [SegmentedButtonComponent, SwitchComponent, TopAppBarComponent],
})
export class SharedModule {}
