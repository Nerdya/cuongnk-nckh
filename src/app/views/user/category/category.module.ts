import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {CategoryRoutingModule} from './category-routing.module';
import {CategoryComponent} from './category.component';


@NgModule({
  imports: [
    CategoryRoutingModule,
    SharedModule,
  ],
  declarations: [
    CategoryComponent,
  ],
  exports: []
})
export class CategoryModule {
}
