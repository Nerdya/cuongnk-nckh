import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { UserFooterComponent } from './user-footer/user-footer.component';



@NgModule({
  imports: [
    UserRoutingModule,
    SharedModule,
  ],
  declarations: [
    UserComponent,
    UserHeaderComponent,
    UserFooterComponent,
  ],
  exports: [
    UserComponent,
    UserHeaderComponent,
    UserFooterComponent,
  ]
})
export class UserModule { }
