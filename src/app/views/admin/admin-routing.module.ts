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
    path: 'user',
    component: AdminComponent,
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule)
  },
  {
    path: 'product',
    component: AdminComponent,
    loadChildren: () => import('./product/product.module').then((m) => m.ProductModule)
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
