import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'invalid-form-control',
  template: `
      <div
      class="invalid-form-control-div"
      *ngIf="
        !control?.valid &&
        (control?.touched || control?.dirty)
      "
    >
      {{
        control?.hasError('required')
          ? input_form?.header + ' Is Required'
          : control?.getError('invalid')
      }}

</div>
  `,
  styles: [
    `
    .invalid-form-control-div{
      color : red;
      margin: 1px 5px;
    }
    `
  ]
})
export class InvalidFormControlComponent {

  @Input() input_form: any;
  @Input() control: any = new FormControl();
}
