import { Injectable } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
type MessageTypes = 'success' | 'info' | 'error' | 'warn';
@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  showAlert(type: MessageTypes, title: string, message: string) {
    this.messageService.add({
      severity: type,
      summary: title,
      detail: message,
      sticky: false,
    });
  }

  shortedMeassge(message: string) {
    if (message)
      return message?.length > 50 ? message?.slice(0, 50) + '...' : message;
    return 'Unknown Error';
  }

  showSuccess(message: string) {
    this.showAlert('success', 'Success Message', this.shortedMeassge(message));
  }

  showError(message: string) {
    this.showAlert('error', 'Error Message', this.shortedMeassge(message));
  }

  showWarning(message: string) {
    this.showAlert('warn', 'Warning Message', this.shortedMeassge(message));
  }

  showNoChangesMsg() {
    this.showAlert('warn', 'Warning Message', 'No changes were made');
  }

  showReqMsg() {
    this.showError('Please complete all required fields');
  }

  clear() {
    this.messageService.clear();
  }

}
