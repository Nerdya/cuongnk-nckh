import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { NavigationComponent } from 'src/app/components/navigation/navigation.component';



@NgModule({
  imports: [
    UserRoutingModule,
    SharedModule,
  ],
  declarations: [
    UserComponent,
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
  ],
  exports: [
    UserComponent,
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
  ]
})
export class UserModule { }
