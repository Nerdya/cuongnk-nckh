import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {ProductsRoutingModule} from './products-routing.module';
import {ProductsComponent} from "./products.component";


@NgModule({
  imports: [
    ProductsRoutingModule,
    SharedModule,
  ],
  declarations: [
    ProductsComponent,
  ],
  exports: []
})
export class ProductsModule {
}
