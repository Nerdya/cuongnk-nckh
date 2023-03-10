import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories.component';



const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CategoriesComponent
  },
  {
    path: 'list',
    component: CategoriesComponent
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
export class CategoriesRoutingModule { }
