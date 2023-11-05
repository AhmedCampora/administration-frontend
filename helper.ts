/*

formChanged: boolean = false;


this.formChanged = false;
    this.form.valueChanges.pipe(take(1)).subscribe(() => {
    this.formChanged = true;
});


if(!this.formChanged){
    this.toast.showNoChangesMsg();
    return;
  }

    changeCountry(id: any) {
    this.router.navigate([`/countries/Edit/${id}`]);
  }



<mts-header-breadcrumb title="Countries"></mts-header-breadcrumb>
<mts-paginator (moveTo)="changeCountry($event)" [breadcrumb]="breadcrumb"></mts-paginator>
breadcrumb: any = {}
this.breadcrumb.url = '/countries'
this.breadcrumb.titles = ['Add New Country'];

// /* Small devices (portrait tablets and large phones, 600px and up) */
// @media only screen and (max-width: 600px) {
//   .width-lg-input {
//     // width: 100%;
//   }
// }

// /* Medium devices (landscape tablets, 768px and up) */
// @media only screen and (max-width: 768px) and (min-width: 600px) {
//   .width-lg-input {
//     // width: 90%;
//   }
// }

// /* Large devices (laptops/desktops, 992px and up) */
// @media only screen and (max-width: 992px) and (min-width: 769px) {
//   .width-lg-input {
//     // width: 80%;
//   }
// }


/* 
private sharedService: SharedService,
    private softSave: SoftSaveService,

  1. search
 
    1.1 saveSearch
    let softSave$ = this.softSave.softSave$;
    if (softSave$.cols) {
      this.formCols = softSave$.cols;
      this.sharedService.clearHidden(softSave$.cols, softSave$);
      this.form.patchValue(softSave$.value);
      this.searchEmitted.emit(softSave$);
    } 

    1.2 default Search
    else {
      this.formCols.map((x: IFormProps) => {
        if (x.name !== 'CountryCode') {
          x.hidden = true;
        }
      });
      this.softSave.clearFormValue();
      this.searchEmitted.emit({
        cols: Object.assign([], this.formCols),
        value: {},
      });
    }

    1.3 in Emit Search
    this.softSave.formSoftSave({
          cols: this.formCols,
          value: e.value,
        });
    
     this.softSave.formSoftSave({
          cols: this.formCols,
          value: e.value,
        });


  2. onClickDetails  

  this.softSave.tableSoftSave({
          ids: this.data,
          propName: 'CountryCode',
          currentId: this.currentRow.CountryCode,
  });

    backToCountries() {
    this.softSave.softSave$ = true;
    this.router.navigate(['/countries']);
  }






  <mts-paginator (moveTo)="changePostOffice($event)" [breadcrumb]="breadcrumb"></mts-paginator>

  breadcrumb: any = {}

  constructor(
    private apis: CountriesService,
    private toast: ToastService,
    private router: Router
  ) {
    this.breadcrumb.url = '/countries';
    if (this.addStat) {
      this.breadcrumb.titles = ['Add New Country'];
    } else {
      this.breadcrumb.titles = [
        `Update Country`,
        `${router.url.split('/')[3]}`,
      ];
    }
  }

  changeCountry(id: any) {
    this.router.navigate([`/countries/Edit/${id}`]);
  }








[show_add]="tableAddTitle"
[show_add]="addPermission ? tableAddTitle : undefined"
  tableAddTitle:ILanguage | undefined = 
  { 
    en: 'New Tariff Plan',
    ar: 'خطة سعر جديدة' 
  };











*/




