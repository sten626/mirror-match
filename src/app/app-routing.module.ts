import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [{
  path: '',
  redirectTo: '/setup',
  pathMatch: 'full'
}, {
  path: 'setup',
  loadChildren: () => import('./setup/setup.module').then(m => m.SetupModule)
}, {
  path: 'swiss',
  loadChildren: () => import('./swiss/swiss.module').then(m => m.SwissModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
