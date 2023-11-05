import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { NavigationEnd, Router } from '@angular/router';
import { LanguageService } from '@shared/services/language.service';
import { lang_types } from 'src/app/data/types/translate.types';

@Component({
  selector: 'app-main-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers: [MessageService],
})
export class MainLayoutComponent {
  isShowSide: boolean = true;
  lang: lang_types = 'ar';
  page: string = '';
  modules: any[] = [];
  constructor(
    private LanguageService: LanguageService,
    private router: Router
  ) {
    this.lang = this.LanguageService.get_app_lang();
    this.router.events.subscribe((val: any) => {
      if (val instanceof NavigationEnd) {
        this.page = val.url;
        if (this.page == '/home') {
          this.isShowSide = false;
        }
      }
    });
  }

  toggle_sidebar() {
    this.isShowSide = !this.isShowSide;
  }
}
