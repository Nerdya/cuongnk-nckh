import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {CategoryRoutingModule} from './category-routing.module';
import {CategoryComponent} from './category.component';
import {LaptopComponent} from './laptop/laptop.component';
import {SmartphoneComponent} from './smartphone/smartphone.component';
import {SmartTVComponent} from './smart-t-v/smart-t-v.component';
import {HeadphoneComponent} from './headphone/headphone.component';
import {OtherComponent} from "./other/other.component";


@NgModule({
  imports: [
    CategoryRoutingModule,
    SharedModule,
  ],
  declarations: [
    CategoryComponent,
    LaptopComponent,
    SmartphoneComponent,
    SmartTVComponent,
    HeadphoneComponent,
    OtherComponent,
  ],
  exports: []
})
export class CategoryModule {
}
