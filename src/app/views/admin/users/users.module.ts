import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../app/shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';



@NgModule({
  imports: [
    UsersRoutingModule,
    SharedModule,
  ],
  declarations: [
  ],
  exports: [
  ]
})
export class UsersModule { }
