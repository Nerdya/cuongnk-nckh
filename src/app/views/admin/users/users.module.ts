import {NgModule} from '@angular/core';
import {SharedModule} from '../../../shared/shared.module';
import {UsersRoutingModule} from './users-routing.module';
import {UsersComponent} from "./users.component";


@NgModule({
  imports: [
    UsersRoutingModule,
    SharedModule,
  ],
  declarations: [
    UsersComponent,
  ],
  exports: []
})
export class UsersModule {
}
