import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CardComponent, TopAppBarComponent } from './components';

@NgModule({
  imports: [CommonModule],
  declarations: [CardComponent, TopAppBarComponent],
  exports: [CardComponent, TopAppBarComponent],
})
export class SharedModule {}
