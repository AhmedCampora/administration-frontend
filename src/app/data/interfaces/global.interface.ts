import { Type } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  DateString,
  I_inputs_status,
  btn_types,
  inputs_types,
} from 'src/app/data/types/global.types';

export interface IFormProps {
  name: string;
  id: string;
  defaultValue?: DateString | any;
  required: boolean;
  header: string;
  type: inputs_types;
  status: I_inputs_status;
  isDropDown?: {
    options: any[];
    optionsName: string;
    label: string;
    value?: string;
    filterBy?: string;
    multi?: boolean;
  };
  icon?: boolean;
  hidden?: boolean;
  milestone?: 'unchecked' | 'crossed' | 'checked';
  priceFeild?: string;
  maxLength?: number;
  dateFormat?: string;
  showTime?: boolean;
  min?: number;
  inNewLine?: boolean;
}

export interface ICols {
  field: string;
  header: string;
  display: number;
  checkbox?: boolean;
  anthoerData?: any;
}

export interface ITableEvent {
  type: btn_types;
  value: any;
}

export interface APIResponse {
  body: any;
  message: string;
  clientMessage?: string;
  statusCode: number;
  [x: string]: any;
}
export interface IFormSubmit {
  invalid: boolean;
  value: any;
  formGroup?: FormGroup;
}
export interface IFormIcon {
  control: any;
  input: IFormProps;
}

export interface ITab {
  header: string;
  component: Type<any> | null;
}

export interface SoftSave extends FormSoftSave, TableSoftSave {}

export interface FormSoftSave {
  value: any;
  cols: IFormProps[];
}

export interface TableSoftSave {
  ids: any[];
  propName: string;
  currentId: string;
}

export interface Config {
  production: boolean;
  apiURL: string;
  type: 'local' | 'sessionId' | 'token';
}