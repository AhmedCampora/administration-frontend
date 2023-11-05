import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectModule } from 'primeng/multiselect';
import { SpanFieldComponent } from './inputs/span-field.component';
import { InputTextFieldComponent } from './inputs/input-text-field.component';
import { InputNumberFieldComponent } from './inputs/input-number-field.component';
import { InputPasswordFieldComponent } from './inputs/input-password-field.component';
import { TextareaFieldComponent } from './inputs/textarea-field.component';
import { DateFieldComponent } from './inputs/date-field.component';
import { DropdownFieldComponent } from './inputs/dropdown-field.component';
import { CheckBoxFieldComponent } from './inputs/check-box-field.component';
import { FormComponent } from './form.component';
import { MultiSelectForFieldsComponent } from './inputs/multi-select-for-fields.component';
import { TimeFieldComponent } from './inputs/time-field.component';
import { InvalidFormControlComponent } from './invalid-form-control/invalid-form-control.component';
import { MultiSelectFieldComponent } from './inputs/multi-select-field.component';
@NgModule({
  declarations: [FormComponent, MultiSelectForFieldsComponent, SpanFieldComponent, 
    InputTextFieldComponent, InputNumberFieldComponent, InputPasswordFieldComponent, TextareaFieldComponent, 
    DateFieldComponent, DropdownFieldComponent, CheckBoxFieldComponent, TimeFieldComponent, 
    InvalidFormControlComponent, MultiSelectFieldComponent],
  imports: [CommonModule, DropdownModule, CalendarModule, ReactiveFormsModule, MultiSelectModule, FormsModule],
  exports: [FormComponent],
})
export class MTSFormModule {}
