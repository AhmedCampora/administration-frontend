import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'span-field',
  template: `
    <div *ngIf="input_form">
      
      <label [style.width.px]="labelWidth">{{ input_form.header }}:</label>
      <span > {{ control && control.value }} </span>
    </div>
  `,
})
export class SpanFieldComponent {
  @Input() input_form: any;
  @Input() labelWidth: number = 100;
  @Input() control: any = new FormControl();
}
// span-field.component.ts