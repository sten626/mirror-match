import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersPageComponent, SetupPageComponent } from '@mm/setup/containers';

export const ROUTES: Routes = [
  {
    path: '',
    component: SetupPageComponent,
    children: [
      {
        path: '',
        redirectTo: 'players',
        pathMatch: 'full'
      },
      {
        path: 'players',
        component: PlayersPageComponent,
        data: { animation: 'PlayersPage' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class SetupRoutingModule {}
