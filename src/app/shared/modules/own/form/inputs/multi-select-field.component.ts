import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { lang_types } from 'src/app/data/types/translate.types';

@Component({
  selector: 'multi-select-field',
  template: `
    <label [style.width.px]="labelWidth" for="{{ input_form.name }}">
        {{ input_form.header }}:<span
          *ngIf="input_form.required"
          class="text-danger"
        >
          *</span
        ></label
      >
    <p-multiSelect
      ngClass="only"
      appendTo="body"
      [options]="input_form.isDropDown.options"
      [optionLabel]="input_form.isDropDown.label"
      class="multicol"
      [displaySelectedLabel]="true"
      [filterBy]="input_form.isDropDown.filterBy ? input_form.isDropDown.filterBy : ''"
      [emptyMessage]="lang == 'en' ? 'No results found' : 'لا توجد نتائج'"
      [emptyFilterMessage]="lang == 'en' ? 'No results found' : 'لا توجد نتائج'"
      [placeholder]="lang == 'en' ? 'Select Multiple' : 'اختيار متعدد'"
      (onChange)="onChange($event)"
      ></p-multiSelect>
      <!-- [selectedItemsLabel]="translate[lang].selectedFields" -->
  `,
  styles: [
    `
      /* #advancedSearch {
        label {
          margin: 1rem 1.5rem;
          display: inline-block !important;
          font-weight: 600;
        }
          height: 30px;
          margin: 0.75rem;
          width: 100%;
        }
        .p-multiselect-label {
          padding: 3.5% 0.75rem;
        }
      } */
    `,
  ],
})
export class MultiSelectFieldComponent {
  @Input() input_form: any;
  @Input() lang: lang_types = 'ar';
  @Input() labelWidth: number = 100;
  @Input() control: any = new FormControl();

  @Output() changeMultiSelectEmitter = new EventEmitter();
  @Output() clearMultiSelectEmitter = new EventEmitter();
  onChange(obj: any) {
    let selectData = {
      value: obj,
      name: this.input_form.name,
    };
    this.changeMultiSelectEmitter.emit(selectData);
  }

  onClearSelect(obj: any): void {
    let selectData = {
      value: obj,
      name: this.input_form.name,
    };
    this.clearMultiSelectEmitter.emit(selectData);
  }
}
