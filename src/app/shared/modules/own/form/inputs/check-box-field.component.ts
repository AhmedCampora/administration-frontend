import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'check-box-field',
  template: `
    <div
      class="check-box-container"
      [class]="input_form.status == 'readonly' ? 'readonly' : ''"
    >
      <label [style.width.px]="labelWidth" for="{{ input_form.name }}">
        {{ input_form.header }}:<span
          *ngIf="input_form.required"
          class="text-danger"
        >
          *</span
        ></label
      >
      <!-- [style]="calc(100% - labelWidth - 10)" -->
      <!-- {{input_form | json}}
    {{input_form.status == 'readonly'}} -->
      <input
        [indeterminate]="input_form.milestone == 'crossed'"
        type="checkbox"
        [formControl]="control"
        class="form-check-input"
        (ngModelChange)="checkMilestone(input_form, $event)"
        id="{{ input_form.id }}"
      />
    </div>
    <!-- <div [ngStyle]="{'width': 'calc(100% - {{labelWidth}} - {{10}})'}" >
  </div> -->
  `,
  styles: [],
})
export class CheckBoxFieldComponent {
  @Input() input_form: any;
  @Input() labelWidth: number = 100;
  @Input() control: any = new FormControl();
  @Output() checkMilestoneEmitter = new EventEmitter();
  checkMilestone(inputForm: any, event: any) {
    this.checkMilestoneEmitter.emit({ event, inputForm });
  }
}
