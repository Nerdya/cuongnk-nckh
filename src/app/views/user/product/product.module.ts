import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {ProductRoutingModule} from './product-routing.module';
import {ProductComponent} from './product.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';


@NgModule({
  imports: [
    ProductRoutingModule,
    SharedModule,
  ],
  declarations: [
    ProductComponent,
    ProductDetailComponent,
  ],
  exports: []
})
export class ProductModule {
}
