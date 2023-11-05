import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ChangeDetectorRef
} from '@angular/core';
import { ILanguage } from '@interfaces/translate.interface';
type btn_types =
  | 'Row'
  | 'View'
  | 'Add'
  | 'Edit'
  | 'Print'
  | 'Print all'
  | 'Export'
  | 'Delete'
  | 'History'
  | 'Paginate'
  | 'Checkbox'
  | 'Reorder';
type lang_types = 'ar' | 'en';

@Component({
  selector: 'mts-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnChanges {
  lang: lang_types;
  
  @Input({ required: true }) cols: any[] = [];
  @Input({ required: true }) data: any[] = [];
  @Input({ required: true }) loading: boolean = false;
  
  @Input() id: string = '';
  @Input() height: number = 400;
  @Input() selected: boolean = false;
  @Input() paginator: boolean = false;
  @Input() totalRecords: number = 0;
  @Input() pageNumber: number = 0;
  @Input() pageSize: number = 0;
  @Input() enableCheckboxes: boolean = false;
  @Input() searchKeyword: boolean = true;

  @Input() show_edit: boolean = false;
  @Input() show_view: boolean = false;
  @Input() show_delete: boolean = false;
  @Input() show_history: boolean = false;
  @Input() show_print: boolean = false;
  @Input() show_reorder: boolean = false;

  @Input() show_export: boolean = false;
  @Input() show_add: ILanguage | undefined; // give it a btn name
  @Input() show_print_all: boolean = false;

  @Output() btn_click = new EventEmitter();
  selectedColumns: any[] = [];
  selectedItemsLabel: string = 'الأعمدة المختارة {0}';
  search_placeholder: string = 'اكتب للبحث';
  emptymessage: string = 'لا توجد بيانات';
  constructor(private cdr:ChangeDetectorRef) {
    this.lang = this.get_app_lang();
  }

  ngOnInit(): void {
    this.createSelectedCols();
    if (this.lang == 'en') {
      this.search_placeholder = 'Type to search';
      this.selectedItemsLabel = '{0} columns selected';
      this.emptymessage = 'No Data Found';
      this.paginatorObj = {
        totalRecords: 0,
        rowsPerPageOptions: [10, 25, 50, 100],
        showFirstLastIcon: true,
        showCurrentPageReport: true,
        currentPageReportTemplate:
          'Showing {first} to {last} of {totalRecords} entries',
      };
    }
    // this.cdr.detach();
    // '{0} columns selected'
  }
  onRowReorder(e: any) {
    this.btn_clicked('Reorder', {
      from: e.dragIndex,
      to: e.dropIndex,
    });
  }

  toggleValue(sa: any, val: any) {
    this.btn_clicked('Checkbox');
    this.data[sa][val] = this.data[sa][val] == 0 ? 1 : 0;
  }

  showSettingsColumn: number = 0;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cols']) {
      this.createSelectedCols();
    }
    // this.showSettingsColumn =
    // console.log(`********************************`);
    // console.log(`changes`);
    // console.log(changes);
    // this.cdr.detectChanges();
    
    // console.log(`********************************`);
    
    // +this.show_edit
    //           + +this.show_view
    //           + +this.show_history
    //           + +this.show_delete
    //           + +this.show_print

  }

  paginatorObj = {
    totalRecords: 0,
    rowsPerPageOptions: [10, 25, 50, 100],
    showFirstLastIcon: true,
    showCurrentPageReport: true,
    currentPageReportTemplate: 'عرض {first} إلى {last} من {totalRecords} عنصر',
  };

  createSelectedCols() {
    this.selectedColumns =
      this.cols?.filter((col: any) => col?.display == 1) || [];
  }

  btn_clicked(type: btn_types, value: any = {}) {
    this.btn_click.emit({
      type,
      value,
    });
  }

  private get_app_lang(): lang_types {
    let lang = localStorage.getItem('lang');
    if (lang == null) {
      const browserLanguage = navigator.language.split('-')[0];
      lang = browserLanguage || 'ar';
    }
    return lang as lang_types;
  }

  items = [
    {
        icon: 'pi pi-pencil',
    },
    {
        icon: 'pi pi-refresh',
    },
    {
        icon: 'pi pi-trash',
    },
    {
        icon: 'pi pi-upload',
        routerLink: ['/fileupload']
    }
];
}


