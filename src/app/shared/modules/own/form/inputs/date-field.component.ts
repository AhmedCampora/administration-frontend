import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'date-field',
  template: `
    <label [style.width.px]="labelWidth" for="{{ input_form.name }}"
      >{{ input_form.header }}:<span
        *ngIf="input_form.required"
        class="text-danger"
      >
        *</span
      ></label
    >

    <!-- [baseZIndex]="50000"
    [autoZIndex]="true" -->
    <p-calendar
      [readonlyInput]="input_form.status == 'readonly'"
      type="date"
      [showIcon]="true"
      [dateFormat]="dateFormat"
      [formControl]="control"
      id="{{ input_form.id }}"
      appendTo="body"
      [showTime]="input_form.showTime" 
      [showSeconds]="input_form.showTime"
      [baseZIndex]="9999"
    ></p-calendar>
  `,
  styles: [
    `
    ::ng-deep{
      p-calendar{
      width:100%;
      }
    }
    `,
  ],
})
export class DateFieldComponent {
  @Input() input_form: any;
  @Input() labelWidth: number = 100;
  @Input() control: any = new FormControl();
  @Input() dateFormat: any = 'dd/mm/yy';
}
