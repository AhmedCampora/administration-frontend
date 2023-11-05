import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { BreadcrumbService } from '@shared/services/breadcrumb-labels.service';
type lang_types = 'ar' | 'en';
@Component({
  selector: 'mts-modal',
  templateUrl: `./modal.component.html`,
  styleUrls : ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnChanges {
  @ViewChild('close_btn') close_btn!: ElementRef;
  @ViewChild('close_btn_confirm') close_btn_confirm!: ElementRef;
  @ViewChild('open_btn') open_btn!: ElementRef;
  @ViewChild('modal', { static: true }) modal!: ElementRef;
  @ViewChild('popupElement', { static: true }) popupElement!: ElementRef;
  headerName: string = 'Mangae'
  @Input() modal_name: string = 'followup';
  @Input() disabled: boolean = false;
  @Input() changesFlag: boolean = false;
  @Input() showFooter: boolean = false;
  @Input() action_name: string = 'Save';
  @Input() cancel_name: string = 'Cancel';
  @Input() header_name: string = 'Manage';
  @Input() size: string = 'modal-lg';

  @Output() action_canceled = new EventEmitter();
  @Output() action_taken = new EventEmitter();
  constructor(private breadCrumbService: BreadcrumbService) {}

  ngOnInit(): void {
    this.setAttrsAr();
  }

  
  close_modal(e:any) {
      if (!this.changesFlag) {      
      this.close_modal_confirmed();
    } else {
      this.action_canceled.emit();
    }
  }

  close_modal_confirmed() {
    this.forceCloseModal();
    this.action_canceled.emit();
  }

  forceCloseModal() {
    this.close_btn?.nativeElement.click();
  }

  save_action() {
    this.action_taken.emit();
  }

  
  clickOnButton(btn_name: 'close' | 'open') {
    switch (btn_name) {
      case 'close':
        this.close_btn_confirm?.nativeElement.click();
        break;
      case 'open':
        this.setAttrsAr();
        this.open_btn?.nativeElement.click();
        break;
      default:
        console.warn('no buttons found by name: ', btn_name);
    }
  }

  private get_app_lang(): lang_types {
    let lang = localStorage.getItem('lang');
    if (lang == null) {
      const browserLanguage = navigator.language.split('-')[0];
      lang = browserLanguage || 'ar';
    }
    return lang as lang_types;
  }

  private setAttrsAr() {
    let lang = this.get_app_lang();
    // this.action_name = lang == 'ar' ? 'حفظ' : 'Save';
    // this.cancel_name = lang == 'ar' ? 'إلغاء' : 'Cancel';
    // this.header_name = lang == 'ar' ? 'إداراة' : 'Mange';
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['header_name'])
    {
      this.headerName = this.breadCrumbService.getLabel(changes['header_name'].currentValue);
    }
  }
}
