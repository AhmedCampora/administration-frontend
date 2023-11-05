import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { loginData, loginUser } from '@interfaces/auth.interface';
import { APIResponse } from '@interfaces/global.interface';
import { AuthService } from '@services/auth.service';
import { ToastService } from '@services/toast.service';
import { APP_NAME } from '@constants/global.constants';
import { LanguageService } from '@shared/services/language.service';
import { Subject, takeUntil } from 'rxjs';
import { lang_types } from 'src/app/data/types/translate.types';
import { logOptions } from 'src/app/data/types/auth.types';
import { configuration } from 'src/app/config/configuration';
import { CommonModule } from '@angular/common';
interface LoginLabels {
  appName: string;
  username: string;
  usernameReq: string;
  password: string;
  passwordReq: string;
  rememberMe: string;
  login: string;
}

const obj_ar: LoginLabels = {
  appName: APP_NAME.ar,
  username: 'اسم المستخدم',
  usernameReq: 'اسم المستخدم مطلوب',
  password: 'كلمة السر',
  passwordReq: 'كلمة السر مطلوبة',
  rememberMe: 'تذكرني',
  login: 'تسجيل الدخول',
};
const obj_en: LoginLabels = {
  appName: APP_NAME.en,
  username: 'Username',
  usernameReq: 'Username Is Required',
  password: 'Password',
  passwordReq: 'Password Is Required',
  rememberMe: 'Remember Me',
  login: 'Login',
};
@Component({
  selector: 'app-login',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class AuthenticationComponent implements OnInit {
  title = '';
  appLang: lang_types = 'ar';
  login_labels!: LoginLabels;
  loginForm!: FormGroup;
  isLoading: boolean = false;
  showErrorMessage: string = '';
  private unSubs = new Subject();

  constructor(
    private translation: LanguageService,
    private authService: AuthService,
    private router: Router,
    private tosat: ToastService
  ) {}

  ngOnInit() {
    this.createLoginForm();
    this.handleSSO();
    this.appLang = this.translation.get_app_lang();
    this.title = APP_NAME[this.appLang];
    this.set_labels();
  }

  login(type: logOptions, userData: loginData = this.loginForm.value) {
    this.isLoading = true;
    let userDataE = this.encryptData(type, userData);
    this.authService
      .loginApi(userDataE)
      .pipe(takeUntil(this.unSubs))
      .subscribe({
        next: (response: APIResponse) => {
          // if (response.statusCode === 200) {}
          this.setSessionParams(userDataE, response);
        },
        error: (error: any) => {
          this.loginError(error, userData);
        },
      });
  }

  setSessionParams(userData: loginData, response: any) {
    this.authService
      .setSessionParamsApi(userData)
      .pipe(takeUntil(this.unSubs))
      .subscribe(
        (_: any) => {
          this.authService.saveUserData(response);
          this.loginSuccessfully();
        },
        (error: any) => {
          this.loginError(error, userData);
        }
      );
  }

  private loginSuccessfully() {
    this.isLoading = false;
    this.router.navigate(['/home']);
    // return
    // let previousUrl: BehaviorSubject<string> = this.authService.getPrevURL();
    // let url =
    //   previousUrl.value.split('/')[1] === ''
    //     ? previousUrl.value
    //     : '/' + previousUrl.value.split('/')[1];
    // if (!PAGES_URLS.includes(url)) {
    //   url = '/home';
    // }
    // this.authService.setSecOption = 'loggedIn';
    // this.router.navigate([url]);
  }

  private handleSSO() {
    this.authService
      .handleSingleSignOn('Login')
      .pipe(takeUntil(this.unSubs))
      .subscribe((response: any) => {
        // if (response.statusCode === 200) {}
        this.setSessionParams(new loginUser(), response);
      });
  }

  private createLoginForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  private set_labels() {
    this.login_labels = this.appLang == 'ar' ? obj_ar : obj_en;
  }

  private loginError(error: any, userData: loginData) {
    this.isLoading = false;
    console.log(`----------------------------------------------------`);
    console.log(`error in login`);
    console.log(error);
    console.log(`----------------------------------------------------`);
    this.showErrorMessage = error;
    if (userData.password !== '' && userData.username !== '') {
      this.tosat.showError(this.showErrorMessage);
    }
  }

  private encryptData(type: logOptions, userData: loginData) {
    let obj = Object.assign({}, userData);
    if (
      type == 'normal' &&
      (configuration.type == 'sessionId' || configuration.type == 'token')
    ) {
      return this.authService.encryptLoginPassword(obj);
    }
    return obj;
  }

  ngOnDestroy() {
    this.unSubs.next('');
    this.unSubs.complete();
    this.unSubs = new Subject();
  }
}
