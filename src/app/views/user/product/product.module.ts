import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../app/shared/shared.module';
import { ProductRoutingModule } from './product-routing.module';



@NgModule({
  imports: [
    ProductRoutingModule,
    SharedModule,
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class ProductModule { }
