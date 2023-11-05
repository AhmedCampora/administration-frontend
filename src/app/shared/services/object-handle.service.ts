import { Injectable } from '@angular/core';
import { IFormProps } from '@interfaces/global.interface';

@Injectable({
  providedIn: 'root'
})
export class ObjectHandleService {

  constructor() { }
  
  handleObject(obj: any) {
    for (let i in obj) {
      if (obj[i] == null) {
        obj[i] = undefined;
      }
    }
    return obj;
  }

  clearEmptyStrings(obj: any): void {
    for (let prop in obj) {
      if (typeof obj[prop] == 'string') {
        obj[prop] = obj[prop].trim();
        if (obj[prop] == '') {
          delete obj[prop];
        }
      }
    }
    return obj;
  }
  clearNullData(obj: any) {
    for (let prop in obj) {
      if (obj[prop] == null) {
        delete obj[prop];
      }
    }
    return obj;
  }

  deleteHiddenFiledsOnly(formCols: any[], obj: any) {
    formCols.map((col: IFormProps) => {
      if (col.hidden) {
        delete obj[col.name];
      }
    });
    return [formCols, obj];
  }

  ignoreHiddenFields(formCols: any[], obj: any) {
    // [formCols, obj] = this.deleteHiddenFiledsOnly(formCols, obj);
    let newObj = Object.assign({}, obj);
    formCols.map((col: IFormProps) => {
      if (col.hidden) {
        delete newObj[col.name];
      }
    });
    newObj = this.clearEmptyStrings(newObj);
    newObj = this.clearNullData(newObj);
    return newObj;
  }

  convertDatePropsToString(obj: any) {
    for (let prop in obj) {
      if (obj[prop] && prop.toLowerCase().includes('date')) {
        obj[prop] = obj[prop].toLocaleDateString();
      }
    }
    return obj; // ret: dd/mm/yyyy
  }

  
  clearHidden(formCols: IFormProps[], softSave: any) {
    formCols.map((x: IFormProps) => {
      if (!softSave.value.hasOwnProperty(x.name)) {
        x.hidden = true;
      }
    });
  }

}
