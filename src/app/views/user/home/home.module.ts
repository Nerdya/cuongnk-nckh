import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../app/shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';



@NgModule({
  imports: [
    HomeRoutingModule,
    SharedModule,
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class HomeModule { }
