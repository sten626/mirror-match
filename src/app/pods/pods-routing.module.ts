import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PodsPageComponent } from '@app/pods/containers';
import { PodsGuard } from '@app/pods/guards';

const routes: Routes = [
  {
    path: '',
    component: PodsPageComponent,
    canActivate: [PodsGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PodsRoutingModule {}
