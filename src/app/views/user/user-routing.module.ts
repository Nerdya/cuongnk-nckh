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
    path: 'category',
    component: UserComponent,
    loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)
  },
  {
    path: 'feedback',
    component: UserComponent,
    loadChildren: () => import('./feedback/feedback.module').then(m => m.FeedbackModule)
  },
  {
    path: 'cart',
    component: UserComponent,
    loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
