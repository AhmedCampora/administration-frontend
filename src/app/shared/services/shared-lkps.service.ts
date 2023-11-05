import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HEADERS_NO_LOADER } from '@constants/global.constants';
import { BehaviorSubject, Observable, debounceTime } from 'rxjs';
import { configuration } from 'src/app/config/configuration';

@Injectable({
  providedIn: 'root',
})
export class SharedLkpsService {
  constructor(private http: HttpClient) {}

  defaultLkp = new BehaviorSubject<any[]>([]);
 
  freeLkps() {
    this.defaultLkp.next([]);
    console.log(`lkps free`);    
  }
}
