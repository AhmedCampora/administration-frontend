import { Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ModalComponent } from '@shared/components/Modal/modal.component';
import { ConfirmationToastComponent } from '@shared/components/confirmation-toast/confirmation-toast.component';
import {
  ICols,
  IFormIcon,
  IFormProps,
  IFormSubmit,
  ITableEvent,
} from '@interfaces/global.interface';
import { ILanguage } from '@interfaces/translate.interface';
import { MtsModulesService } from '@shared/services/mts-modules.service';
import { PermissionsService } from '@shared/services/permisions.service';
import { ToastService } from '@shared/services/toast.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent {
  constructor(
    // private test: TestService,
    private toastService: ToastService,
    private sharedService: MtsModulesService,
    private permissionService: PermissionsService
  ) {
    [this.editBtnView] = permissionService.havePermissions(['TestEdit.view']);
  }

  ngOnInit() {
    this.tableCols = this.sharedService.get_cols_by_fileds_and_headers(
      this.tableColsStrings,
      'test'
    );
    this.formCols = [
      {
        header : 'Test',
        id : 'test',
        name : 'test',
        required : true,
        status : 'basic',
        type : 'text',
        icon : true,
      }
    ]
    this.tableData = [{test: 'Ahmed'},{test: 'Ahmed 2'}]
    this.formCols = this.sharedService.translate(this.formCols, 'test');
    this.form = this.sharedService.create_form_by_cols(this.formCols);
  }

  // Table Start
  tableColsStrings: string[] = ['1_test'];
  tableCols: ICols[] = [];
  tableData: any[] = [];

  editBtnView: boolean = false;
  addBtnView: boolean = true;
  deleteBtnView: boolean = false;

  searchKeywordView: boolean = false;
  selected: boolean = false;
  loading: boolean = false;

  tableAddTitle: ILanguage | undefined = {
    en: 'New Test',
    ar: 'اختبار جديد',
  };

  @ViewChild('testModal') testModal!: ModalComponent;

  tableBtnClick(event: ITableEvent) {
    this.testModal?.clickOnButton('open');
  }

  // Table End

  // Modal Start
  headerName: 'addTest' | 'editTest' = 'addTest';
  modalOnCancel() {}
  modalOnSubmit() {}
  // Modal End

  // Form Start
  form!: FormGroup;
  formCols: IFormProps[] = [];
  formOnSubmit(e: IFormSubmit) {
    console.log('event');
    console.log(e);
    
  }
  
  onIconClick(event :IFormIcon ){
    console.log('event');
    console.log(event);
    console.log('event.input.name');
    console.log(event.input.name);
    
    
  }

  formOnCancel() {}
  formOnReset() {}
  formDateChange($event: any) {}
  formCheckBoxClick($event: any) {}
  formOnOtherClick($event: any) {}
  formOnIconClick($event: any) {}
  formDropdownChange($event: any) {}
  formDropdownClear($event: any) {}
  // Form End

  // mts-confirm-toast start
  @ViewChild('confirmationDelete')
  confirmationDelete!: ConfirmationToastComponent;
  deleteTest() {}
  // mts-confirm-toast end
}
// Table Start
// Table End
