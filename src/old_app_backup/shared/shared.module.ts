import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CardComponent,
  IconComponent,
  ListComponent,
  ListItemComponent,
  TopAppBarComponent,
} from './components';

@NgModule({
  imports: [CommonModule],
  declarations: [
    CardComponent,
    IconComponent,
    ListComponent,
    ListItemComponent,
    TopAppBarComponent,
  ],
  exports: [
    CardComponent,
    IconComponent,
    ListComponent,
    ListItemComponent,
    TopAppBarComponent,
  ],
})
export class SharedModule {}
