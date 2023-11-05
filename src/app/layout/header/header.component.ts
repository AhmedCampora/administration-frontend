import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { LanguageService } from '@shared/services/language.service';
import { ModulesService } from '@services/modules.service';
import { AuthService } from '@services/auth.service';
import { APP_NAME } from '@constants/global.constants';
import { lang_types } from 'src/app/data/types/translate.types';
import { ChangePasswordComponent } from './change-password/change-password.component';

interface HeaderLabels {
  title: string;
  changePassword: string;
  lang: string;
  logout: string;
  langs: string;
}
export interface IApps {
  link: string;
  title: string;
  title_ar: string;
  type?: string;
}

const obj_ar: HeaderLabels = {
  changePassword: 'تغيير كلمة السر',
  lang: 'تغيير اللغة',
  logout: 'تسجيل الخروج',
  title: APP_NAME.ar,
  langs: 'English | الإنجليزية',
};
const obj_en: HeaderLabels = {
  changePassword: 'Change Password',
  lang: 'Language',
  logout: 'Logout',
  title: APP_NAME.en,
  langs: 'Arcbic | العربية',
};

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('app_change_password')
  app_change_password!: ChangePasswordComponent;
  @Input() isShowSide: boolean = false;
  @Input() pageName: string = '';
  lang: lang_types = 'ar';
  username: any = ''; // Display username ????
  apps: IApps[] = [];
  headers_lables!: HeaderLabels;
  constructor(
    private LanguageService: LanguageService,
    private renderer: Renderer2,
    private moduleService: ModulesService,
    private authApis: AuthService
  ) {}

  ngOnInit(): void {
    this.setLayoutTitles();
    this.moduleService.change_modules_headers.subscribe(()=>{this.setLayoutTitles();});
  }

  setLayoutTitles() {
    this.lang = this.LanguageService.get_app_lang();
    this.getUserName();
    let x = localStorage.getItem('userModules');
    if (x) this.set_modules(JSON.parse(x));
    this.set_headers();
  }

  getUserName() {
    if (localStorage.getItem('username')) 
      this.username = localStorage.getItem('username');
    else this.username = this.lang == 'ar' ? 'اسم المستخدم' : 'User Name';
  }

  set_modules(x: any[]) {
    this.apps = [];
    for (let i = 0; i < x.length; i++) {
      let obj: any = {};
      obj['title'] = x[i][2];
      obj['title_ar'] = x[i][3];
      obj['link'] = x[i][4];
      this.apps.push(obj);
    }
  }

  set_headers() {
    this.headers_lables = this.lang == 'ar' ? obj_ar : obj_en;
  }

  changeLang(newLang: string) {
    this.lang = newLang = newLang.startsWith('Arcbic') ? 'ar' : 'en';
    this.LanguageService.set_config_app_lang(newLang as lang_types);
    this.renderer.setAttribute(document.body, 'lang', newLang);
    this.setLayoutTitles();
    this.getUserName();
    this.moduleService.change_modules_headers.next();
  }

  redirect(link: string): void {
    if (link.startsWith('http')) {
      window.location.href = link;
      return;
    }
    window.location.href = 'http://' + window.location.host + link;
  }

  ty: boolean = true;
  translate() {
    this.ty = !this.ty;
  }

  @Output() toggle_sidebar = new EventEmitter();
  toggleShowSide() {
    this.toggle_sidebar.emit();
  }

  changePassword() {
    this.app_change_password!.openModal();
  }

  logout() {
    this.authApis.logoutUser();
  }
}
