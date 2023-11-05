import { Component, Input } from '@angular/core';
import { lang_types } from 'src/app/data/types/translate.types';

@Component({
  selector: 'app-layout',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss'],
})
export class AppLayoutComponent {
  @Input() lang: lang_types = 'ar';
  @Input() isShowSide: boolean = false;
}
