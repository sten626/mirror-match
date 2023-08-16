import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from '@mm/setup/components';
import { SetupPageComponent } from '@mm/setup/containers';

const routes: Routes = [
  {
    path: '',
    component: SetupPageComponent,
    children: [
      {
        path: '',
        component: StartComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetupRoutingModule {}
