import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {SessionStorageService} from "../../services/session-storage.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  constructor(
    private sessionStorageService: SessionStorageService,
    private router: Router,
  ) {
  }

  get currentYear() {
    return new Date().getFullYear();
  }

  get getCurrentUser() {
    return this.sessionStorageService.getItem('currentUser');
  }

  login() {
    this.router.navigate(['/auth/login']);
  }

  logout() {
    this.sessionStorageService.removeItem('currentUser');
    this.router.navigate(['/auth/login']);
  }

  register() {
    this.router.navigate(['/auth/register']);
  }
}
