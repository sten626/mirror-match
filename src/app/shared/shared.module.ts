import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CardComponent,
  ListComponent,
  ListItemComponent,
  TopAppBarComponent,
} from './components';

@NgModule({
  imports: [CommonModule],
  declarations: [
    CardComponent,
    ListComponent,
    ListItemComponent,
    TopAppBarComponent,
  ],
  exports: [
    CardComponent,
    ListComponent,
    ListItemComponent,
    TopAppBarComponent,
  ],
})
export class SharedModule {}
