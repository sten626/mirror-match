import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '@app/core/components';

export const routes: Routes = [
  //   {
  //   path: '',
  //   redirectTo: '/setup',
  //   pathMatch: 'full'
  // }, {
  //   path: 'pods',
  //   loadChildren: () => import('./pods/pods.module').then(m => m.PodsModule)
  // }, {
  //   path: 'setup',
  //   loadChildren: () => import('./setup/setup.module').then(m => m.SetupModule)
  // }, {
  //   path: 'swiss',
  //   loadChildren: () => import('./swiss/swiss.module').then(m => m.SwissModule)
  // },
  {
    path: '',
    loadChildren: () =>
      import('./tournament/tournament.module').then((m) => m.TournamentModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    data: { title: 'Not found' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
