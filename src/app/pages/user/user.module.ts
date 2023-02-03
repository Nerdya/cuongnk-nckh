import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserHeaderComponent } from './user-header/user-header.component';
import { UserFooterComponent } from './user-footer/user-footer.component';



const routes: Routes = [
  { path: '',  component: UserComponent }
];

@NgModule({
  declarations: [
    UserComponent,
    UserHeaderComponent,
    UserFooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModule { }
