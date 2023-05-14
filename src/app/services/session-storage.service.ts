import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  // Method to get an item from session storage
  getItem(key: string): any {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  // Method to set an item in session storage
  setItem(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  // Method to remove an item from session storage
  removeItem(key: string): void {
    sessionStorage.removeItem(key);
  }

  // Method to clear the entire session storage
  clear(): void {
    sessionStorage.clear();
  }
}
