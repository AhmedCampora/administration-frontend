import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'input-text-field',
  template: `
    <ng-container *ngIf="input_form">
      <label [style.width.px]="labelWidth" for="{{ input_form.name }}"
        >{{ input_form.header }}:<span
          *ngIf="input_form.required"
          class="text-danger"
        >
          *
        </span></label
      >
      <!-- style="width:max(calc(100% - 120px), 200px)" -->
      <input
        type="text"
        [formControl]="control"
        [readonly]="input_form.status == 'readonly'"
        [ngClass]="input_form.status == 'readonly' ? 'disable-control' : 'form-control'"
        id="{{ input_form.id }}"
      />
      <ng-container *ngIf="input_form.icon">
      <span class="search-img" (click)="searchByInput(input_form, control)">
          <i class="fa-solid fa-magnifying-glass input-icon-search"></i>
          </span>
      </ng-container>
    </ng-container>
  `
})
export class InputTextFieldComponent {
  @Input() input_form: any;
  @Input() labelWidth: number = 100;
  @Input() control: any = new FormControl();
  @Output() searchByInputEmitter = new EventEmitter();

  searchByInput(input: any, control: any) {
    this.searchByInputEmitter.emit({ input, control });
  }
}
// span-field.component.ts
