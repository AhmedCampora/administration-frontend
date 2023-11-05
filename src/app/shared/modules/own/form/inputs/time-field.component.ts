import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'input-time-field',
  template: `
    <label [style.width.px]="labelWidth" for="{{ input_form.name }}"
      >{{ input_form.header }}:<span
        *ngIf="input_form.required"
        class="text-danger"
      >
        *</span
      ></label
    >
    <input
      type="time"
      [formControl]="control"
      [ngClass]="
        input_form.status == 'readonly' ? 'disable-control' : 'form-control'
      "
      id="{{ input_form.id }}"
    />
  `,
})
export class TimeFieldComponent {
  @Input() input_form: any;
  @Input() labelWidth: number = 150;
  @Input() control: any = new FormControl();
}
