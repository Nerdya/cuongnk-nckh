import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserComponent} from './user.component';


const routes: Routes = [
  {
    path: '../',
    component: UserComponent,
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'product',
    component: UserComponent,
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
  },
  {
    path: '**',
    redirectTo: '../'
  }
  // {
  //   path: '../',
  //   children: [
  //     {
  //       path: '',
  //       component: UserComponent,
  //       loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  //     },
  //     {
  //       path: 'product',
  //       component: UserComponent,
  //       loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
  //     },
  //     {
  //       path: '**',
  //       redirectTo: ''
  //     }
  //   ]
  // },
  // {
  //   path: '**',
  //   redirectTo: '../'
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
