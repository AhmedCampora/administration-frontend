import { Injectable } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { LanguageService } from './language.service';
import { ICols, IFormProps } from '@interfaces/global.interface';
import { translate_object } from '@lang/global.lang';
import { TranslateService } from './translate.service';
import { DatesService } from './dates.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private translateService: TranslateService, private datesService:DatesService) {}

  translation(){
    return this.translateService;
  }

  dates(){
    return this.datesService;
  }


  // getIds() :  Observable<any[]>{
  //   if(this.ids.value.length != 0){
  //     return this.ids.asObservable();
  //   }
  //   return this.ids.asObservable();
  // }
}
