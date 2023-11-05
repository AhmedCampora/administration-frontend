import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'input-password-field',
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
      type="password"
      autocomplete
      [formControl]="control"
      [readonly]="input_form.status == 'readonly'"
      [ngClass]="input_form.status == 'readonly' ? 'disable-control' : 'form-control'"
      id="{{ input_form.id }}"
    />
  `,
  styles: [],
})
export class InputPasswordFieldComponent {
  @Input() input_form: any;
  @Input() labelWidth: number = 100;
  @Input() control: any = new FormControl();

  logInputForm(){
    console.log('this.input_form');
    console.log(this.control);
    
  }
}
