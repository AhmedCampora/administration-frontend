import { Injectable } from '@angular/core';
import {
  FormSoftSave,
  TableSoftSave,
} from '@interfaces/global.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SoftSaveService {
  constructor() {}
  tableSoftSave(object: TableSoftSave) {
    this.setIdsInLS(object.ids, object.propName, object.currentId);
  }

  formSoftSave(object: FormSoftSave) {
    this.setFormValueInLS(object);
  }

  setIdsInLS(ids: any[], propName: string, id: any) {
    let currentInd = 0;
    ids = ids.map((row: any, ind) => {
      if (row[propName] == id) {
        currentInd = ind;
      }
      return row[propName];
    });
    localStorage.setItem('ids', JSON.stringify(ids));
    this.setIndInLS(currentInd);
  }

  setIndInLS(currentInd: any) {
    localStorage.setItem('currentInd', String(currentInd));
  }

  setFormValueInLS(formValue: any) {
    localStorage.setItem('formValue', JSON.stringify({ ...formValue }));
  }

  clearFormValue() {
    localStorage.removeItem('formValue');
  }

  getFormValueFromLS(): any {
    if (localStorage.getItem('formValue') == null) {
      this.softSave$ = false;
      return {};
    }
    return { ...JSON.parse(localStorage.getItem('formValue') || '') };
  }

  getIdsFromLS(): any {
    try{
      return [
        JSON.parse(localStorage.getItem('ids') || ''),
        Number(localStorage.getItem('currentInd')) + 1 || 1,
      ];
    }
    catch(err){
      return [[] , 0];
    }
  }

  private softSaveFlag = new BehaviorSubject<boolean>(false);

  get softSave$(): boolean | any {
    if (this.softSaveFlag.value) {
      return this.getFormValueFromLS();
    }
    return false;
  }

  set softSave$(value: boolean) {
    this.softSaveFlag.next(value);
  }
}
