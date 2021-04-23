import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersPageComponent } from '@mm/players/containers';

export const routes: Routes = [
  {
    path: '',
    component: PlayersPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayersRoutingModule {}
