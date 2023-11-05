import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { lang_types } from 'src/app/data/types/translate.types';

@Component({
  selector: 'dropdown-field',
  template: `
    <ng-container *ngIf="input_form.isDropDown">
      <label [style.width.px]="labelWidth" for="{{ input_form.name }}">
        {{ input_form.header }}:<span
          *ngIf="input_form.required"
          class="text-danger"
        >
          *</span
        ></label
      >
      <!-- [autoZIndex]="true"
        [baseZIndex]="1600" -->
      <p-dropdown
      [ngClass]="input_form.status == 'readonly' ? 'disable-dropdown' : ''"
        [optionLabel]="input_form.isDropDown.label"
        [optionValue]="input_form.isDropDown.value ?? ''"
        [formControl]="control"
        [filter]="true"
        [emptyMessage]="lang == 'en' ? 'No results found' : 'لا توجد نتائج'"
        [emptyFilterMessage]="lang == 'en' ? 'No results found' : 'لا توجد نتائج'"
        [placeholder]="lang == 'en' ? 'Select' : 'اختيار'"
        [options]="input_form.isDropDown.options"
        [virtualScroll]="true"
        [showClear]="true"
        [filterBy]="input_form.isDropDown.filterBy ? input_form.isDropDown.filterBy : ''"
        [virtualScrollItemSize]="20"
        appendTo="body"
        (ngModelChange)="changeSelect($event)"
        (onClear)="onClearSelect($event)"
      ></p-dropdown>
    </ng-container>
  `,
  styles: [],
})
export class DropdownFieldComponent {
  @Input() input_form: any;
  @Input() lang: lang_types = 'ar';
  @Input() labelWidth: number = 100;
  @Input() control: any = new FormControl();
  
  @Output() changeSelectEmitter = new EventEmitter();
  @Output() clearSelectEmitter = new EventEmitter();
  changeSelect(obj: any) {
    let selectData = {
      value: obj,
      name: this.input_form.name,
    };
    this.changeSelectEmitter.emit(selectData);
  }

  onClearSelect(obj: any): void {
    let selectData = {
      value: obj,
      name: this.input_form.name,
    };
    this.clearSelectEmitter.emit(selectData);
  }
}
