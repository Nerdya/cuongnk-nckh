import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {LocalStorageService} from "../../services/local-storage.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
  ) {
  }

  get isUserLoggedIn() {
    return this.localStorageService.getItem('currentUser');
  }

  login() {
    this.router.navigate(['/auth/login']);
  }

  logout() {
    this.localStorageService.removeItem('currentUser');
    this.router.navigate(['/auth/login']);
  }
}
