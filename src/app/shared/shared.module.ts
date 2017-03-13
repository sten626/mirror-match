import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { OutstandingPairingsPipe } from './pipes';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    OutstandingPairingsPipe
  ],
  exports: [
    CommonModule,
    OutstandingPairingsPipe,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
