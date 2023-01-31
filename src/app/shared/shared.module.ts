import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopAppBarComponent } from './components';

@NgModule({
  declarations: [TopAppBarComponent],
  imports: [CommonModule],
  exports: [TopAppBarComponent],
})
export class SharedModule {}
