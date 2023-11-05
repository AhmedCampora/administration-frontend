import { Component, OnInit, Renderer2 } from '@angular/core';
import { LanguageService } from '@shared/services/language.service';
import { directions } from 'src/app/data/types/global.types';
import { lang_types } from 'src/app/data/types/translate.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Tempalte'; // #appConfiguration
  constructor(
    private renderer: Renderer2,
    public translation: LanguageService
  ) {}
  
  dir: directions = 'ltr';
  appLang: lang_types = 'ar';

  ngOnInit() {
    this.appLang = this.translation.get_app_lang();
    this.renderer.setAttribute(document.body, 'lang', this.appLang);
    if (this.appLang == 'ar') {
      this.dir = 'rtl';
    }
    this.renderer.setStyle(document.body, 'direction', this.dir);
  }

  ngAfterViewInit() {
    let loader = this.renderer.selectRootElement('#overlay-app');
    this.renderer?.setStyle(loader, 'display', 'none');
  }
}
