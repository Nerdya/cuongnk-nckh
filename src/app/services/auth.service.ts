import {Injectable} from '@angular/core';
import {SessionStorageService} from "./session-storage.service";
import {HttpService} from "./http.service";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Table, User} from "../shared/interfaces/common.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpService: HttpService,
    private sessionStorageService: SessionStorageService,
  ) {
  }

  isCurrentUserAdmin(): boolean {
    const currentUser: User = this.sessionStorageService.getItem('currentUser');
    return currentUser && currentUser.role === 'admin';
  }

  getUsersTable(): Observable<any> {
    return this.httpService.get(environment.USERS_TABLE);
  }

  updateUsersTable(body: Table, params?: any): Observable<any> {
    return this.httpService.put(environment.USERS_TABLE, body, params);
  }
}
