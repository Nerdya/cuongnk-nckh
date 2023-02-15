import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../app/shared/shared.module';
import { CategoriesRoutingModule } from './categories-routing.module';



@NgModule({
  imports: [
    CategoriesRoutingModule,
    SharedModule,
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class CategoriesModule { }
