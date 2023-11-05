import { Injectable } from '@angular/core';
import { LanguageService } from '@shared/services/language.service';
import { breadcrumbLabel } from '@lang/breadcrumb.labels';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  constructor(private translate: LanguageService) {}

  getLabel(title: string): string {
    return breadcrumbLabel[this.translate.get_app_lang()][title] || title;
  }
}
