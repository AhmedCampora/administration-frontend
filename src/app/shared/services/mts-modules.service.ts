import { Injectable } from '@angular/core';
import { translate_object } from '@lang/global.lang';
import { LanguageService } from './language.service';
import { ICols, IFormProps } from '@interfaces/global.interface';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class MtsModulesService {

  constructor(private LanguageService: LanguageService) {}

  get_cols_by_fileds_and_headers(headers: string[], path: string = 'global') {
    let lang = this.LanguageService.get_app_lang();
    let cols: ICols[] = [];
    let missing: any = {};
    let obj: ICols = { field: '', header: '', display: 1 };
    headers.map((name: string) => {
      if (name.startsWith('checkbox_')) {
        obj.checkbox = true;
        name = name.split('checkbox_')[1];
        if (name.includes('*')) {
          let parts = name.split('*');
          obj.anthoerData = parts[0];
          name = parts[1];
        }
      }
      let display = name.slice(0, 1);
      let field = name.slice(2);
      obj.field = field;
      
      
      if (translate_object.hasOwnProperty(path) && translate_object[path][lang].hasOwnProperty(obj.field)) {
        obj.header = translate_object[path][lang][obj.field];
      } else {
        obj.header = translate_object['global'][lang][obj.field];
        // console.log(`********************************`);
        // console.log(path + ' ' + lang + ' ' + obj.field);
        // console.log(`********************************`);
      }

      // obj.header = translate_object['global'][lang][field];
      if (!obj.header) {
        missing[obj.field] = ''
      }
      obj.display = +display;
      cols.push(Object.assign({}, obj));
      delete obj.checkbox;
    });
    // console.log(`cols`);
    // console.log(cols);
    // console.warn('missing');
    // console.warn({
    //   ar:missing,
    //   en:missing
    // });

    return cols;
  }

  getIndexesMap(array: any[]): any[] {
    let arr: any = {};
    for (let i = 0; i < array.length; i++) {
      arr[array[i].name] = i;
    }
    return arr;
  }

  translate(cols: any, path: string = 'global'): any[] {
    let lang = this.LanguageService.get_app_lang();
    return cols.map((x: IFormProps) => {
      if (translate_object['global'][lang].hasOwnProperty(x.name)) {
        x.header = translate_object['global'][lang][x.name];
      } else {
        x.header = translate_object[path][lang][x.name];
      }
      if (!x.header) {
        console.warn(x.name + ' missing');
      }
      return x;
    });
  }

  toArabic(obj: any, path: string = 'global') {
    let lang = this.LanguageService.get_app_lang();
    for (let x in obj) {
      obj[x] = translate_object[path][lang][x];
    }
    return obj;
  }
  
  create_form_by_cols(cols: any[], validatorFn?: ValidatorFn) {
    let formControls: any = {};
    let form!: FormGroup;
    for (const col of cols) {
      const validators = col.required ? Validators.required : null;
      formControls[col.name] = new FormControl(
        '' || col.defaultValue,
        validators
      );
    }
    form = new FormGroup(formControls, { validators: validatorFn });
    return form;
  }

}
