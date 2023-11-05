import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  isLoading: Subject<boolean>;
  numberOfPendingRequests: number = 0;
  constructor() {
    this.isLoading = new Subject<boolean>();
  }

  show() {
    this.numberOfPendingRequests++;
    this.isLoading.next(true);
  }
  
  hide() {
    this.numberOfPendingRequests--;
    if (this.numberOfPendingRequests <= 0) {
      this.numberOfPendingRequests = 0;
      this.isLoading.next(false);
    }
  }
}