import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {APIHelperService} from './api-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private api: APIHelperService,
  ) {
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  login(username: string = "0395663678", password: string = "123456Aa") {
    return this.api.post(environment.LOGIN, {username, password});
  }
}
