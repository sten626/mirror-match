import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PairingsFilterPipe, SortStandingsPipe } from 'app/shared/pipes';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    PairingsFilterPipe,
    ReactiveFormsModule,
    SortStandingsPipe
  ],
  declarations: [
    PairingsFilterPipe,
    SortStandingsPipe
  ]
})
export class SharedModule { }
