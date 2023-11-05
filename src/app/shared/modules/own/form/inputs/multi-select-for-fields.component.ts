import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IFormProps } from '@interfaces/global.interface';

@Component({
  selector: 'multi-select-for-fields',
  template: ` <div id="advancedSearch" *ngIf="advancedSearch">
    <label>{{ translate[lang].addMoreFields }}</label>
    <p-multiSelect
      ngClass="only"
      [options]="cols"
      optionLabel="header"
      [(ngModel)]="selectedFields"
      [ngModelOptions]="{ standalone: true }"
      class="multicol"
      [emptyMessage]="lang == 'en' ? 'No results found' : 'لا توجد نتائج'"
      [emptyFilterMessage]="lang == 'en' ? 'No results found' : 'لا توجد نتائج'"
      [selectedItemsLabel]="translate[lang].selectedFields"
      [placeholder]="translate[lang].selectedFields"
      (onChange)="showField($event)"
    ></p-multiSelect>
  </div>`,
  styles: [
    `
      #advancedSearch {
        label {
          margin: 1rem 1.5rem;
          display: inline-block !important;
          font-weight: 600;
        }
        .p-multiselect {
          height: 30px;
          margin: 0.75rem;
        }
        .p-multiselect-label {
          padding: 3.5% 0.75rem;
        }
      }
    `,
  ],
})
export class MultiSelectForFieldsComponent {
  @Input() translate!: any;
  @Input() cols!: any;
  @Input() advancedSearch: boolean = false;
  @Input() selectedFields!: any;
  @Input() lang!: any;

  @Output() showHideFields = new EventEmitter();

  showField(e: any): void {
    if (e.itemValue) {
      this.cols.map((x: IFormProps) => {
        if (e.itemValue.id == x.id) {
          x.hidden = !x.hidden;
        }
      });
    } else {
      this.cols.map(
        (x: IFormProps) => (x.hidden = e.value.length == 0 ? true : false)
      );
    }
  }
}

/*
  disableCheckedCheckBox() {
    const multiselectHeader = this.elementRef.nativeElement.querySelector(
      '.p-multiselect-header'
    );
    const checkbox = multiselectHeader.querySelector('.p-checkbox');

    // Apply the desired styles using Renderer2
    this.renderer.addClass(checkbox, 'disable-checkbox');
  }

  disableHeaderCheckBox() {
    const checkboxSelected = this.elementRef.nativeElement.querySelector(
      '.p-checkbox-box.p-highlight'
    );
    // const checkbox = multiselectHeader.querySelector('.p-checkbox');

    // Apply the desired styles using Renderer2
    this.renderer.addClass(checkboxSelected, 'disable-checkbox');
  }

  

  setCheckboxStyle(): void {
    const multiselectHeader = this.elementRef.nativeElement.querySelector(
      '.p-multiselect-header'
    );
    const checkbox = multiselectHeader.querySelector('.p-checkbox');

    // Apply the desired styles using Renderer2
    this.renderer.addClass(checkbox, 'disable-checkbox');
  }

*/
