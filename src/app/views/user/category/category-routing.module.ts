import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoryComponent} from './category.component';
import {LaptopComponent} from "./laptop/laptop.component";
import {SmartphoneComponent} from "./smartphone/smartphone.component";
import {SmartTVComponent} from "./smart-t-v/smart-t-v.component";
import {HeadphoneComponent} from "./headphone/headphone.component";
import {OtherComponent} from "./other/other.component";


const routes: Routes = [
  {
    path: '',
    component: CategoryComponent
  },
  {
    path: 'laptop',
    component: LaptopComponent
  },
  {
    path: 'smartphone',
    component: SmartphoneComponent
  },
  {
    path: 'smart-tv',
    component: SmartTVComponent
  },
  {
    path: 'headphone',
    component: HeadphoneComponent
  },
  {
    path: 'other',
    component: OtherComponent
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
export class CategoryRoutingModule {
}
