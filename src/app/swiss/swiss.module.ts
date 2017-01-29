import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SwissComponent } from './swiss.component';
import { SwissPlayersComponent } from './swiss-players.component';
import { SharedModule } from '../shared';

const routes: Routes = [{
  path: 'swiss',
  component: SwissComponent,
  children: [{
    path: '',
    component: SwissPlayersComponent
  }]
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    SwissComponent,
    SwissPlayersComponent
  ]
})
export class SwissModule { }
