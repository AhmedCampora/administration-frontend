import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { APIResponse } from '@interfaces/global.interface';
import { loginUser } from '@interfaces/auth.interface';
import { ModulesService } from './modules.service';
import { configuration } from 'src/app/config/configuration';
import { secOptions } from 'src/app/data/types/auth.types';
import { ObjectHandleService } from './object-handle.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private objectHandle: ObjectHandleService,
    private modulesService: ModulesService
  ) {}

  logoutUser() {
    this.logoutApi().subscribe((response: APIResponse) => {
      this.logoutLocal();
    });
  }

  private logoutApi(): Observable<any> {
    return this.http.get<Observable<any>>(
      configuration.apiURL + '/api/auth/logout'
    );
  }

  loginApi(_f: any): Observable<any> {
    return this.http.post<Observable<any>>(
      configuration.apiURL + '/api/auth/signin',
      _f
    );
  }

  setSessionParamsApi(_f: any) {
    return this.http.post<any>(configuration.apiURL + '/api/auth/setParam', _f);
  }

  changePassword(obj: any) {
    return this.http.post<any>(
      configuration.apiURL + '/api/auth/changePassword',
      obj
    );
  }

  encryptLoginPassword(userObject: any): any {
    userObject = this.objectHandle.handleObject(userObject);
    let obj = new loginUser();
    obj.username = userObject.username;
    obj.password = this.encryptString(userObject.password);
    return obj;
  }

  encryptChangePassword(obj: any) {
    for (let key in obj) {
      obj[key] = this.encryptString(obj[key]);
    }
    return obj;
  }

  encryptString(str: string) {
    // let CryptoJS = require('crypto-js');
    let key = CryptoJS.enc.Latin1.parse('MTS@SECRET#KEYMA');
    let iv = CryptoJS.enc.Latin1.parse('AMYEK#TERCES@STM');
    let encrypted = CryptoJS.AES.encrypt(str, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.ZeroPadding,
    });
    return encrypted.toString();
  }

  private prevURL = new BehaviorSubject('home');

  setPrevURL(val: string) {
    this.prevURL.next(val);
  }
  getPrevURL() {
    return this.prevURL;
  }

  private secOptions: secOptions = 'None';

  get getSecOption() {
    return this.secOptions;
  }

  set setSecOption(value: secOptions) {
    console.log(`secOptions changed to ${value}`);
    this.secOptions = value;
  }

  private isLoggedOut() {
    return this.secOptions == 'loggedOut';
  }

  isLoggedIn() {
    return this.secOptions == 'loggedIn' && localStorage.getItem('username');
  }

  handleSingleSignOn(fromWhat: 'Home' | 'Login'): Observable<any> {
    if (this.isLoggedIn()) {
      this.router.navigate(['/home']);
      return of(true);
    } else if (!this.isLoggedOut()) {
      return this.loginApi(new loginUser()).pipe(
        map((response: APIResponse) => {
          this.saveUserData(response);
          // if (fromWhat == 'Home') { this.saveUserData(response); }
          return response;
        }),
        catchError(() => {
          return of(false);
        })
      );
    } else {
      return of(false);
    }
  }

  logoutLocal() {
    let x = localStorage.getItem('lang') || 'ar';
    localStorage.clear();
    localStorage.setItem('lang', x);
    this.secOptions = 'loggedOut';
    this.modulesService.clearPermissions();
    this.router.navigate(['/']);
  }

  goToForbidden() {
    this.router.navigate(['/forbidden']);
  }

  saveUserData(response: APIResponse | any) {
    let data = response.body || response;
    this.secOptions = 'loggedIn';
    console.log(`user logged successfully`);

    localStorage.setItem('authorities', JSON.stringify(data.authorities));
    localStorage.setItem('username', data.username);
    sessionStorage.setItem('userName', data.username);
    localStorage.setItem('userModules', JSON.stringify(data.userModules));
    this.modulesService.change_modules_headers.next();
  }
}
