import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFormProps } from '@interfaces/global.interface';
import { lang_types } from 'src/app/data/types/translate.types';
import { translate } from './consts';
import { HandleFormValueService } from './handle-form-value.service';
import { ILanguage } from '@interfaces/translate.interface';
export type checkboxStatus = 'checked' | 'unchecked' | 'crossed';
@Component({
  selector: 'mts-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnChanges {
  lang: lang_types = 'ar';
  reset_string: string = '';
  cancel_string: string = '';
  action_string: string = '';
  translate = translate;

  @Input() selectedFields: any[] = [];
  @Input() reset: boolean = false;
  @Input() cancel: boolean = false;
  @Input() overlaySkeleton: boolean = false;
  @Input() action: 'save' | 'search' | 'none' = 'save';
  @Input() other: ILanguage | undefined; // give it a btn name
  @Input() form_width: number = 80;
  @Input() form!: FormGroup;
  @Input() advancedSearch: boolean = false;
  @Input() cols!: IFormProps[];
  @Input() nCols: number = 3;
  @Input() showPrintBtn: boolean = false;
  @Input() invalidForm: boolean = false;
  @Output() onIconClick = new EventEmitter();
  @Output() changeDate = new EventEmitter();
  @Output() onSubmit = new EventEmitter();
  @Output() onCancel = new EventEmitter();
  @Output() onReset = new EventEmitter();
  @Output() onOtherClick = new EventEmitter();

  @Input() minDate: any = null;
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private handleFormValue: HandleFormValueService
  ) {
    this.lang = this.get_app_lang();
  }

  ngOnInit(): void {
    this.action_string = this.translate[this.lang][this.action];
    this.reset_string = this.reset ? this.translate[this.lang].reset : '';
    this.cancel_string = this.cancel ? this.translate[this.lang].cancel : '';
    setTimeout(() => {
      this.selectedFields = this.cols.filter((x: IFormProps) => !x.hidden);
      this.getLabelWidthByChars();
    }, 200);
  }

  labelWidth: number = 100;
  getLabelWidthByChars() {
    let nChars = 10;
    this.cols.map((row: IFormProps) => {
      nChars = Math.max(row.header?.length, nChars);
    });
    this.labelWidth = nChars * 11;
  }
  ngOnChanges(changes: SimpleChanges): void {
    setTimeout(() => {
      if (changes['cols'])
        this.selectedFields = this.cols.filter((x: IFormProps) => !x.hidden);
    }, 300);
  }

  cancel_operation(e: any) {
    this.form.reset();
    this.set_checkboxes();
    this.onCancel.emit(e);
  }

  get_event_data() {
    this.handleData();

    let uu = Object.assign(
      {},
      this.handleFormValue.handle_form(
        this.form,
        this.cols,
        this.checkBoxCrossed
      )
    );
    this.onSubmit.emit({ ...uu, formGroup: this.form });
  }
  handleData() {
    for (let col of this.cols) {
      if (col.type == 'date' && !col.showTime) {
        let date = this.form.controls[col.name].value;
        if (date instanceof Date && !isNaN(date.getTime())) {
          const day = date.getDate();
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          const formattedDate = `${day < 10 ? '0' + day : day}/${
            month < 10 ? '0' + month : month
          }/${year}`;
          // console.log(formattedDate);
          this.form.controls[col.name].patchValue(formattedDate, {
            emitEvent: false,
          });
        }
      }
    }

    return;
  }

  searchByInput(e:any) {
    console.log('e');
    console.log(e);
    
    this.onIconClick.emit({ input:e.input, control: e.control });
  }

  set_checkboxes() {
    for (let i = 0; i < this.cols.length; i++) {
      if (this.cols[i].type == 'checkbox') {
        let name = this.cols[i].name;
        let x = this.form.controls[name].value;
        switch (x) {
          case '0':
          case 0:
          case false:
          case null:
          case undefined:
          case '':
            this.cols[i].milestone = 'unchecked';
            this.checkBoxCrossed.set(name, 0);
            break;
          case '1':
          case 1:
          case true:
            this.checkBoxCrossed.set(name, 1);
            this.cols[i].milestone = 'checked';
            break;
        }
      }
    }
  }

  @Output() selectedChange = new EventEmitter();
  @Output() selectedCleard = new EventEmitter();
  changeSelect($event: any) {
    this.selectedChange.emit($event);
  }
  clearSelect($event: any) {
    this.selectedCleard.emit($event);
  }

  checkBoxCrossed = new Map();
  @Output() checkBoxClicked = new EventEmitter();
  checkMilestone(obj: any, index: number) {
    let input = obj.inputForm;
    let event = obj.event;
    switch (input.milestone) {
      case 'checked': {
        this.checkBoxCrossed.set(input.name, 0);
        input.milestone = 'unchecked';
        this.setValue(index, 'unchecked');
        break;
      }
      case 'unchecked': {
        this.checkBoxCrossed.set(input.name, 1);
        this.setValue(index, 'checked');
        input.milestone = 'checked';
        break;
      }
      case 'crossed': {
        this.checkBoxCrossed.set(input.name, 1);
        this.setValue(index, 'checked');
        input.milestone = 'checked';
        break;
      }
    }
    let emitValue = {
      newValue: event,
      checkBoxData: input,
      index: index,
    };
    this.checkBoxClicked.emit(emitValue);
  }

  reset_form() {
    this.form.reset();
    this.set_checkboxes();
    this.onReset.emit();
  }

  otherClicked() {
    this.onOtherClick.emit();
  }

  handle_checkboxes(value: any) {
    this.handleFormValue.handle_checkboxes(
      value,
      this.cols,
      this.checkBoxCrossed
    );
  }

  private setValue(index: number, value: checkboxStatus) {
    this.cols[index].milestone = value;
  }

  private get_app_lang(): lang_types {
    let lang = localStorage.getItem('lang');
    if (lang == null) {
      const browserLanguage = navigator.language.split('-')[0];
      lang = browserLanguage || 'ar';
    }
    return lang as lang_types;
  }

  printForm() {
    console.log(this.form);
  }

  closeModalAndResetForm() {
    this.form.reset();
    this.set_checkboxes();
  }

  @Output() multiSelectedChange = new EventEmitter();
  @Output() multiSelectedCleard = new EventEmitter();
  changeMultiSelect(event:any){
    this.multiSelectedChange.emit(event);
  }
  clearMultiSelect(event:any){
    this.multiSelectedCleard.emit(event);
  }
}
