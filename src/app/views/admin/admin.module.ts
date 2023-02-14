import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UsersComponent } from './users/users.component';



@NgModule({
  imports: [
    AdminRoutingModule,
    SharedModule,
  ],
  declarations: [
    AdminComponent,
    UsersComponent,
  ],
  exports: [
    AdminComponent,
  ]
})
export class AdminModule { }
