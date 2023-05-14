import {Injectable} from '@angular/core';
import {HttpService} from "./http.service";
import {Table} from "../shared/interfaces/common.interface";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private httpService: HttpService,
  ) {
  }

  getProductsTable(): Observable<any> {
    return this.httpService.get(environment.PRODUCTS_TABLE);
  }

  updateProductsTable(body: Table, params?: any): Observable<any> {
    return this.httpService.put(environment.PRODUCTS_TABLE, body, params);
  }

  getFeedbacksTable(): Observable<any> {
    return this.httpService.get(environment.FEEDBACKS_TABLE);
  }

  updateFeedbacksTable(body: Table, params?: any): Observable<any> {
    return this.httpService.put(environment.FEEDBACKS_TABLE, body, params);
  }

}
