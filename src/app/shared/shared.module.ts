import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PairingsFilterPipe } from 'app/shared/pipes';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    PairingsFilterPipe,
    ReactiveFormsModule
  ],
  declarations: [
    PairingsFilterPipe
  ]
})
export class SharedModule { }
