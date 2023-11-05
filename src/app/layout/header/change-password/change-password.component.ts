import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SharedService } from '@services/shared.service';
import { change_password_columns } from './data';
import { ToastService } from '@services/toast.service';
import { AuthService } from '@services/auth.service';
import { LanguageService } from '@shared/services/language.service';
import { APIResponse } from '@interfaces/global.interface';
import { lang_types } from 'src/app/data/types/translate.types';
import { MtsModulesService } from '@shared/services/mts-modules.service';
import { ModalComponent } from '@shared/components/Modal/modal.component';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  @ViewChild('change_password_modal') change_password_modal!: ModalComponent;
  cols: any[] = [];
  form!: FormGroup;
  headerName = 'changePassword';
  lang: lang_types = 'ar';
  constructor(
    private mtsModuleService: MtsModulesService,
    private toast: ToastService,
    private auth_service: AuthService,
    private LanguageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.setConfigs();
  }

  openModal() {
    this.setConfigs();
    this.form.reset();
    this.change_password_modal!.clickOnButton('open');
  }

  reset() {
    this.change_password_modal!.clickOnButton('close');
    this.form.reset();
  }

  change_password_validations() {
    let value = this.form.value;
    let invalid = this.form.invalid;
    if (invalid) {
      this.toast.showReqMsg();
    } else if (!this.match_two_passwords(value)) {
      this.toast.showAlert(
        'error',
        'Error',
        'New Password not equal confirm password'
      );
    } else {
      delete value.confirmPassword;
      this.change_password_api(value);
    }
  }

  private change_password_api(value: any) {
    let form_value = this.auth_service.encryptChangePassword(value);
    // return;
    this.auth_service.changePassword(form_value).subscribe(
      (result: APIResponse) => {
        this.toast.showSuccess('Password changed successfully');
      },
      (error: any) => {
        // this.toast.showError(error.message);
      }
    );
  }

  private match_two_passwords({ newPassword, confirmPassword }: any) {
    if (newPassword == confirmPassword) {
      return true;
    }
    return false;
  }

  private setConfigs() {
    this.cols = this.mtsModuleService.translate(change_password_columns, 'auth');
    this.form = this.mtsModuleService.create_form_by_cols(this.cols);
    this.lang = this.LanguageService.get_app_lang();
  }
}
