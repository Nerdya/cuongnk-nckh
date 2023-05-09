import {Injectable} from '@angular/core';
import {LocalStorageService} from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private localStorageService: LocalStorageService,
  ) {
  }

  isCurrentUserAdmin(): boolean {
    const currentUser = this.localStorageService.getItem('currentUser');
    return currentUser && currentUser.role === 'admin';
  }
}
