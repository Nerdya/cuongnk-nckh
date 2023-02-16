import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  subscribeToObservable<T>(observable: Observable<T>, onNext: (value: T) => void, onError?: (error: any) => void, onComplete?: () => void) {
    observable.subscribe({ 
      next: onNext,
      error: onError,
      complete: onComplete
    });
  }
}
