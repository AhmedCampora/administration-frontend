import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'input-number-field',
  template: `
    <ng-container *ngIf="input_form">
      <label [style.width.px]="labelWidth" for="{{ input_form.name }}"
        >{{ input_form.header }}:<span
          *ngIf="input_form.required"
          class="text-danger"
        >
          *</span
        ></label
      >
      <input
        type="number"
        [formControl]="control"
        [readonly]="input_form.status == 'readonly'"
        [ngClass]="
          input_form.status == 'readonly' ? 'disable-control' : 'form-control'
        "
        id="{{ input_form.id }}"
        [min]="input_form?.min"
        pattern="^[^+e-]+$"
        onkeypress="return event.charCode >= 48 && event.charCode <= 57"
        (input)="limitInputLength($event)"
      />
      <ng-container *ngIf="input_form.icon">
        <span class="search-img" (click)="searchByInput(input_form, control)">
          <i class="fa-solid fa-magnifying-glass input-icon-search"></i>
          <!-- <img src="/assets/img/lov_ena.png" alt="search"/> -->
        </span>
      </ng-container>
    </ng-container>
  `,
})
export class InputNumberFieldComponent {
  @Input() input_form: any;
  @Input() labelWidth: number = 100;
  @Input() control: any = new FormControl();
  @Output() searchByInputEmitter = new EventEmitter();
  @Input() maxLength: any;
  searchByInput(input: any, control: any) {
    this.searchByInputEmitter.emit({ input, control });
  }
  limitInputLength(event: Event) {
    if (this.maxLength) {
      const inputElement = event.target as HTMLInputElement;
      if (inputElement.value.length > this.maxLength) {
        inputElement.value = inputElement.value.slice(0, this.maxLength);
      }
    }
  }
}
