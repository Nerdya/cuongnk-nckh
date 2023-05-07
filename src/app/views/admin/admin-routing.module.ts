import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from './admin.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AdminComponent
  },
  {
    path: 'categories',
    component: AdminComponent,
    loadChildren: () => import('./categories/categories.module').then((m) => m.CategoriesModule)
  },
  {
    path: 'users',
    component: AdminComponent,
    loadChildren: () => import('./users/users.module').then((m) => m.UsersModule)
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
export class AdminRoutingModule {
}
