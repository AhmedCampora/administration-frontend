import {
  Component,
  ElementRef,
  Input,
  Output,
  ViewChild,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { LanguageService } from '@shared/services/language.service';
import { lang_types } from 'src/app/data/types/translate.types';
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
interface confirmationToastlabels {
  header: string;
  message: string;
  closeBtnName: string;
  actionBtnName: string;
}
type ConfirmationTypes = 'cancel' | 'delete' | 'leave';
@Component({
  selector: 'mts-confirm-toast',
  templateUrl: './confirmation-toast.component.html',
  styleUrls: ['./confirmation-toast.component.scss'],
})
export class ConfirmationToastComponent implements OnChanges {
  @ViewChild('open_btn') open_btn!: ElementRef;
  @ViewChild('cancel_btn') cancel_btn!: ElementRef;
  @Output() confirmed = new EventEmitter();
  @Input() labelsType: ConfirmationTypes = 'cancel';
  @Input() labels: confirmationToastlabels = {
    actionBtnName: 'Delete',
    closeBtnName: 'Cancel',
    header: 'Confirmation Message',
    message: 'Are you sure you want to confirm this operation?',
  };
  
  myModal: string = 'myModal';
  lang: lang_types = 'ar';

  constructor(private transalterService: LanguageService) {
    this.myModal = this.generateRandomString();
    this.lang = this.transalterService.get_app_lang();
    this.cancelOrDelete('delete');
  }

  confirm(confirm: 'confirm' | 'cancel') {
    this.confirmed.emit(confirm);
  }
  open() {
    this.open_btn?.nativeElement.click();
  }
  cancel() {
    this.cancel_btn?.nativeElement.click();
  }

  cancelOrDelete(operationType: 'cancel' | 'delete') {
    // alert(operationType)
    if (this.lang !== 'ar') {
      if (operationType == 'cancel') {
        this.labels = {
          actionBtnName: 'Close Anyway',
          closeBtnName: 'Cancel Closing',
          header: 'Confirmation Message',
          message: 'Are you sure you want to discard changes?',
        };
      } else {
        this.labels = {
          actionBtnName: 'Delete',
          closeBtnName: 'Cancel',
          header: 'Confirmation Message',
          message: 'Are you sure you want to confirm this operation?',
        };
      }
    } else {
      this.labels = {
        actionBtnName: 'تأكيد',
        closeBtnName: 'تجاهل',
        header: 'رسالة تأكيد',
        message: 'هل تريد تأكيد هذه العملية؟',
      };
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['labelsType']?.currentValue == 'cancel') {
      this.cancelOrDelete('cancel');
    } else {
      this.cancelOrDelete('delete');
    }
    // console.log(`********************************`);
    // console.log(changes);
    // console.log(`********************************`);
    
  }

  private generateRandomString(): string {
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += characters.charAt(Math.floor(Math.random() * 52));
    }
    return result;
  }
}
