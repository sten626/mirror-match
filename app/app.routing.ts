import { Routes, RouterModule } from '@angular/router';

import { PlayersComponent } from './players/players.component';

const appRoutes: Routes = [{
  path: '',
  redirectTo: '/players',
  pathMatch: 'full'
}, {
  path: 'players',
  component: PlayersComponent
}];

export const routing = RouterModule.forRoot(appRoutes);
