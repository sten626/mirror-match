import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { FabComponent } from '@app/shared/components';
import { PairingsFilterPipe, SortStandingsPipe } from '@app/shared/pipes';

const COMPONENTS = [FabComponent];
const MATERIAL = [
  MatButtonModule,
  MatCardModule,
  MatExpansionModule,
  MatTableModule
];

@NgModule({
  imports: [CommonModule, MATERIAL, ReactiveFormsModule],
  declarations: [COMPONENTS, PairingsFilterPipe, SortStandingsPipe],
  exports: [
    CommonModule,
    COMPONENTS,
    MATERIAL,
    PairingsFilterPipe,
    ReactiveFormsModule,
    SortStandingsPipe
  ]
})
export class SharedModule {}
