import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home.component';


@NgModule({
  imports: [
    HomeRoutingModule,
    SharedModule,
  ],
  declarations: [
    HomeComponent,
  ],
  exports: []
})
export class HomeModule {
}
