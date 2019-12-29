import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';
import { FooterComponent, LayoutComponent, PageNotFoundComponent, SidenavComponent } from '@app/core/components';

const COMPONENTS = [
  FooterComponent,
  LayoutComponent,
  PageNotFoundComponent,
  SidenavComponent
];

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    RouterModule
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS
})
export class CoreModule {}
