import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from './user.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UserComponent
  },
  {
    path: 'list',
    component: UserComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
