import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFormProps } from '@interfaces/global.interface';

@Injectable({
  providedIn: 'root'
})
export class HandleFormValueService {

  constructor() { }

  handle_form(form:FormGroup, cols:any[], map: Map<any, any>) {
    let value: any = Object.assign({}, form.getRawValue());
    value = this.handle_checkboxes(value, cols, map);
    let invalid = form.invalid;
    return {
      value,
      invalid,
    };
  }

  handle_checkboxes(value: any , cols: any[], checkBoxCrossed:Map<any, any>) {
    cols.map((x: IFormProps) => {
      if (x.type == 'checkbox') {
        if (checkBoxCrossed.has(x.name)) {
          value[x.name] = checkBoxCrossed.get(x.name);
        } else {
          value[x.name] = value[x.name] == true ? 1 : 0;
          // if (value[x.name] == '') {
          //   value[x.name] = 0;
          // } else {
          // value[x.name] = value[x.name] ? 1 : 0;
          // }
        }
      }
      else if( x.type == 'number'){
        if(value[x.name] == ''){
          value[x.name] = 0;
        }
      }
    });
    return value;
  }
  formatDate(x: any) {
    let newDateFormat = '';
    if (typeof x === 'object' && x != null && x != '') {
      let day = x.getDate().toString().padStart(2, '0');
      let month = (x.getMonth() + 1).toString().padStart(2, '0');
      let year = x.getFullYear();
      newDateFormat = `${day}/${month}/${year}`;
    }
    return newDateFormat;
  }
}
