import {NgModule} from '@angular/core';
import {SharedModule} from '../../shared/shared.module';
import {UserRoutingModule} from './user-routing.module';
import {UserComponent} from './user.component';


@NgModule({
  imports: [
    UserRoutingModule,
    SharedModule,
  ],
  declarations: [
    UserComponent,
  ],
  exports: [
    UserComponent,
  ]
})
export class UserModule {
}
