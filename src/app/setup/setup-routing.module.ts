import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersPageComponent, SetupPageComponent } from '@app/setup/containers';

const routes: Routes = [{
  path: '',
  component: SetupPageComponent,
  children: [{
    path: '',
    redirectTo: 'players',
    pathMatch: 'full'
  }, {
    path: 'players',
    component: PlayersPageComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupRoutingModule {}
