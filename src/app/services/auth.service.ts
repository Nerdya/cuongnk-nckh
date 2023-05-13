import {Injectable} from '@angular/core';
import {LocalStorageService} from "./local-storage.service";
import {HttpService} from "./http.service";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {Table} from "../shared/interfaces/common.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpService: HttpService,
    private localStorageService: LocalStorageService,
  ) {
  }

  isCurrentUserAdmin(): boolean {
    const currentUser = this.localStorageService.getItem('currentUser');
    return currentUser && currentUser.role === 'admin';
  }

  getUsersTable(): Observable<any> {
    return this.httpService.get(environment.USERS_TABLE_PATH);
  }

  updateUsersTable(body: Table, params?: any): Observable<any> {
    return this.httpService.put(environment.USERS_TABLE_PATH, body, params);
  }
}
