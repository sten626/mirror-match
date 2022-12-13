import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'swiss',
  loadChildren: () => import('./swiss/swiss.module').then(m => m.SwissModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
