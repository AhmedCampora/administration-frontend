import { Component, OnInit } from '@angular/core';
import { IModules } from '@interfaces/modules.interface';
import { AuthService } from '@services/auth.service';
import { ModulesService } from '@services/modules.service';
import { LanguageService } from '@shared/services/language.service';
import { lang_types } from 'src/app/data/types/translate.types';
import { configuration } from 'src/app/config/configuration';
import { loginData, loginUser } from '@interfaces/auth.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  modules: IModules[] = [];
  userName: any = '';
  apps = [];
  lang: lang_types = 'ar';
  constructor(
    private LanguageService: LanguageService,
    private authService: AuthService,
    private modulesService: ModulesService
  ) {
    this.lang = this.LanguageService.get_app_lang();
    this.getModules();
  }

  getModules() {
    this.modules = this.modulesService.getModules(true);
  }

  ngOnInit() {
    if (configuration.type !== 'local') {
      if (!this.authService.isLoggedIn()) {
        this.authService
          .handleSingleSignOn('Home')
          .subscribe((response: any) => {
            if (typeof response == 'boolean') {
              if (!response) {
                this.authService.logoutLocal(); // uncomment this inSecurity
              }
            } else {
              this.setSessionParams(new loginUser(), response);
            }
          });
      }
    }
    this.modulesService.change_modules_headers.subscribe(() => {
      this.lang = this.LanguageService.get_app_lang();
      this.getModules();
    });
  }

  setSessionParams(userData: loginData, response: any) {
    this.authService
      .setSessionParamsApi(userData)
      .pipe(takeUntilDestroyed())
      .subscribe(
        (_: any) => {
          this.authService.saveUserData(response);
          // this.loginSuccessfully();
        },
        (error: any) => {
          this.authService.logoutLocal();
        }
      );
  }
}
