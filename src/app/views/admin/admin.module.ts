import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {AdminRoutingModule} from './admin-routing.module';
import {AdminComponent} from './admin.component';
import {LocationStrategy, PathLocationStrategy} from "@angular/common";


@NgModule({
  imports: [
    AdminRoutingModule,
    SharedModule,
  ],
  declarations: [
    AdminComponent,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    }
  ]
})
export class AdminModule {
}
