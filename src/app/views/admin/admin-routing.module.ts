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
    path: 'users',
    component: AdminComponent,
    loadChildren: () => import('./users/users.module').then((m) => m.UsersModule)
  },
  {
    path: 'products',
    component: AdminComponent,
    loadChildren: () => import('./products/products.module').then((m) => m.ProductsModule)
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
