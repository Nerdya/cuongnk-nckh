import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class APIHelperService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private apiUrl = environment.API_URL;

  constructor(private http: HttpClient) {}

  get(url: string): Observable<any> {
    return this.http.get(this.apiUrl + url, { headers: this.headers, observe: 'response' });
  }

  post(url: string, data: any): Observable<any> {
    return this.http.post(this.apiUrl + url, data, { headers: this.headers, observe: 'response' });
  }

  put(url: string, data: any): Observable<any> {
    return this.http.put(this.apiUrl + url, data, { headers: this.headers, observe: 'response' });
  }

  delete(url: string): Observable<any> {
    return this.http.delete(this.apiUrl + url, { headers: this.headers, observe: 'response' });
  }
}
