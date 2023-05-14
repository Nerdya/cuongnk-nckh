import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core'
import {Observable, of, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {appConfig} from "../../environments/app-config";

@Injectable({providedIn: 'root'})
export class HttpService {
  httpOption: any = {};

  constructor(
    private httpClient: HttpClient,
  ) { }

  get apiUrl() {
    return appConfig.API_URL;
  }

  // get loginUrl() {
  //   return '';
  // }

  checkHttpCode(httpCode: any) {
    if (httpCode) {
      console.warn('httpCode', httpCode);
    }
    return;
  }

  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      console.error(`Error: ${error.error.message}`);
    } else {
      // Server-side errors
      console.error(`Error code: ${error.status}\nMessage: ${error.message}`);
      switch (error.status) {
        case 401:
          // this.notifyService.notify('ERROR', 'Thông báo', error.message);
          // window.location.replace(`${this.loginUrl}?returnUrl=${window.location.origin}/auth/callback&state=/`);
          return of(null);
        case 404:
          return of(null);
      }
    }
    return throwError(error);
  }

  getHttpOption(hasAuth = true, params?: any, responseType = 'application/json;charset=utf-8') {
    let httpOption: any = {
      headers: new HttpHeaders({
          'Accept': [responseType],
          'Content-Type': responseType,
          'Access-Control-Allow-Origin': '*',
        },
      ),
      params: new HttpParams(),
    };
    const token = localStorage.getItem('token');
    if (responseType === 'multipart/form-data') {
      httpOption.headers = new HttpHeaders({
        'Accept': '*',
      })
    }
    if (hasAuth && token) {
      httpOption.headers = httpOption.headers.set('token', token);
      httpOption.headers = httpOption.headers.set('csid', '1');
    }
    if (responseType === 'blob') {
      httpOption['responseType'] = responseType;
    }
    if (params) {
      const field: any = Object.keys(params);
      const valueField: any = Object.values(params);
      for (let i = 0; i < field.length; i++) {
        if (valueField[i] && valueField[i] !== null) {
          httpOption.params = httpOption.params.append(field[i], valueField[i].toString());
        }
      }
    }
    return httpOption;
  }

  get(path: string, params?: any, hasAuth?: boolean): Observable<HttpResponse<any> | null> {
    const url: string = this.apiUrl + path;
    this.httpOption = this.getHttpOption(hasAuth, params);
    try {
      return this.httpClient.get<any>(url, this.httpOption).pipe(
        map((resp: any) => {
          if (!resp.status) {
            this.checkHttpCode(resp.httpCode);
          }
          return resp;
        }),
        catchError(error => this.handleError(error))
      );
    } catch (err: any) {
      throw new Error(err);
    }
  }

  getByUrl(url: string, params?: any): Observable<HttpResponse<any> | null> {
    this.httpOption = this.getHttpOption(false, params);
    try {
      return this.httpClient.get<any>(url, this.httpOption).pipe(
        map((resp: any) => {
          if (!resp.status) {
            this.checkHttpCode(resp.httpCode);
          }
          return resp;
        }),
        catchError(error => this.handleError(error))
      );
    } catch (err: any) {
      throw new Error(err);
    }
  }

  post(path: string, body: any, params?: any, hasAuth?: boolean): Observable<HttpResponse<any> | null> {
    const url: string = this.apiUrl + path;
    this.httpOption = this.getHttpOption(hasAuth, params);
    try {
      return this.httpClient.post<any>(url, body, this.httpOption).pipe(
        map((resp: any) => {
          if (!resp.status) {
            this.checkHttpCode(resp.httpCode);
          }
          return resp;
        }),
        catchError(error => this.handleError(error))
      );
    } catch (err: any) {
      throw new Error(err);
    }
  }

  patch(path: string, body: any, params?: any, hasAuth?: boolean): Observable<HttpResponse<any> | null> {
    const url: string = this.apiUrl + path;
    this.httpOption = this.getHttpOption(hasAuth, params);
    try {
      return this.httpClient.patch<any>(url, body, this.httpOption).pipe(
        map((resp: any) => {
          if (!resp.status) {
            this.checkHttpCode(resp.httpCode);
          }
          return resp;
        }),
        catchError(error => this.handleError(error))
      );
    } catch (err: any) {
      throw new Error(err);
    }
  }

  postByUrl(url: string, body: any, params?: boolean): Observable<HttpResponse<any> | null> {
    this.httpOption = this.getHttpOption(false, params);
    try {
      return this.httpClient.post<any>(url, body, this.httpOption).pipe(
        map((resp: any) => {
          if (!resp.status) {
            this.checkHttpCode(resp.httpCode);
          }
          return resp;
        }),
        catchError(error => this.handleError(error))
      );
    } catch (err: any) {
      throw new Error(err);
    }
  }

  put(path: string, body: any, params?: any, hasAuth?: boolean): Observable<HttpResponse<any> | null> {
    const url: string = this.apiUrl + path;
    this.httpOption = this.getHttpOption(hasAuth, params);
    try {
      return this.httpClient.put<any>(url, body, this.httpOption).pipe(
        map((resp: any) => {
          if (!resp.status) {
            this.checkHttpCode(resp.httpCode);
          }
          return resp;
        }),
        catchError(error => this.handleError(error))
      );
    } catch (err: any) {
      throw new Error(err);
    }
  }

  delete(path: string, params?: any, hasAuth?: boolean): Observable<HttpResponse<any> | null> {
    const url: string = this.apiUrl + path;
    this.httpOption = this.getHttpOption(hasAuth, params);
    try {
      return this.httpClient.delete(url, this.httpOption).pipe(
        map((resp: any) => {
          if (!resp.status) {
            this.checkHttpCode(resp.httpCode);
          }
          return resp;
        }),
        catchError(error => this.handleError(error))
      );
    } catch (err: any) {
      throw new Error(err);
    }
  }

  exportFile(path: string, params?: any, responseType?: any, hasAuth?: any): Observable<Blob | null> {
    const url: string = this.apiUrl + path;
    this.httpOption = this.getHttpOption(hasAuth, params, responseType);
    try {
      return this.httpClient.get<HttpResponse<Blob>>(url, this.httpOption).pipe(
        map((resp: any) => {
          if (!resp.status) {
            this.checkHttpCode(resp.httpCode);
          }
          return resp;
        }),
        catchError(error => this.handleError(error))
      );
    } catch (err: any) {
      throw new Error(err);
    }
  }

  importFile(path: string, formData: any, contentType: any, hasAuth?: any): Observable<Blob | null> {
    const url: string = this.apiUrl + path;
    this.httpOption = this.getHttpOption(hasAuth, {}, contentType);
    try {
      return this.httpClient.post<HttpResponse<Blob>>(url, formData, this.httpOption).pipe(
        map((resp: any) => {
          if (!resp.status) {
            this.checkHttpCode(resp.httpCode);
          }
          return resp;
        }),
        catchError(error => this.handleError(error))
      );
    } catch (err: any) {
      throw new Error(err);
    }
  }

  // Commonly used functions
  getAll(path: string, params?: any, hasAuth?: boolean): Observable<any> {
    return this.get(path, params, hasAuth);
  }

  getById(path: string, id: string = '', params?: any, hasAuth?: boolean): Observable<any> {
    if (id !== '') {
      path = path.toString().replace(':id', id);
    }
    return this.get(path, params, hasAuth);
  }

  putById(path: string, id: string = '', body?: any, params?: any, hasAuth?: boolean): Observable<any> {
    if (id !== '') {
      path = path.toString().replace(':id', id);
    }
    return this.put(path, body, params, hasAuth);
  }

  deleteById(path: string, id: string = '', params?: any, hasAuth?: boolean): Observable<any> {
    if (id !== '') {
      path = path.toString().replace(':id', id);
    }
    return this.delete(path, params, hasAuth);
  }

  exportFileById(path: string, params?: any, responseType?: any, id?: any, hasAuth?: boolean): Observable<any> {
    if (id !== '') {
      path = path.toString().replace(':id', id);
    }
    return this.exportFile(path, params, responseType, hasAuth);
  }
}
