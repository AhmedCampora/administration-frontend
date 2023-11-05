import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'textarea-field',
  template: `
    <label for="{{ input_form.name }}"
      [style.width.px]="labelWidth"
      >{{ input_form.header }}:<span
        *ngIf="input_form.required"
        class="text-danger"
      >
        *</span
      ></label
    >
    <!-- style="width:max(calc(100% - 120px), 200px)" -->
    <textarea
      type="text"
      [formControl]="control"
      [readonly]="input_form.status == 'readonly'"
      [ngClass]="input_form.status == 'readonly' ? 'disable-control' : 'form-control'"
      id="{{ input_form.id }}"
    ></textarea>
  `,
  styles: [],
})
export class TextareaFieldComponent {
  @Input() input_form: any;
  @Input() labelWidth: number = 100;
  @Input() control: any = new FormControl();
}
