import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./setup/setup.module').then((m) => m.SetupModule),
  },
  // {
  //   path: 'players',
  //   loadChildren: () =>
  //     import('./players/players.module').then((m) => m.PlayersModule),
  // },
  // {
  //   path: 'setup',
  //   loadChildren: () =>
  //     import('./setup/setup.module').then((m) => m.SetupModule),
  // },
  // {
  //   path: 'pods',
  //   loadChildren: () => import('./pods/pods.module').then(m => m.PodsModule)
  // }, {
  //   path: 'setup',
  //   loadChildren: () => import('./setup/setup.module').then(m => m.SetupModule)
  // }, {
  //   path: 'swiss',
  //   loadChildren: () => import('./swiss/swiss.module').then(m => m.SwissModule)
  // },
  // {
  //   path: '**',
  //   component: PageNotFoundComponent,
  //   data: { title: 'Not found' },
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
