import { Injectable } from '@angular/core';
import { INameable } from '@interfaces/translate.interface';
import { lang_types } from 'src/app/data/types/translate.types';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  
  currentLanguage: lang_types = 'en';
  constructor() {
    this.currentLanguage = this.set_config_app_lang();
  }

  private set_app_lang(lang: lang_types) {
    this.currentLanguage = lang;
  }

  get_app_lang() {
    let lang = localStorage.getItem('lang');
    if (lang == null) {
      const browserLanguage = navigator.language.split('-')[0];
      lang = browserLanguage || 'ar';
    }
    return lang as lang_types;
  }

  // available in home module only
  set_config_app_lang(new_lang?: lang_types) {
    if (new_lang) {
      this.set_app_lang(new_lang);
      localStorage.setItem('lang', new_lang);
      return new_lang;
    }
    let newLang = this.get_app_lang();
    this.set_app_lang(newLang);
    return newLang;
  }

  replace_name_with_lang<T extends INameable>(items: T[]): T[] {
    for (let i = 0; i < items.length; i++) {
      items[i].name = this.currentLanguage == 'ar' ? items[i].ar_name : items[i].en_name;
    }
    return items;
  }
}
