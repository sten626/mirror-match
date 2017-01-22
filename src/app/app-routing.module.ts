import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SwissPlayersComponent } from './swiss/swiss-players.component';

const routes: Routes = [{
  path: '',
  redirectTo: '/players',
  pathMatch: 'full'
}, {
  path: 'players',
  component: SwissPlayersComponent
}];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
