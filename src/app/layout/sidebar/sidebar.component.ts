import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IModules } from '@interfaces/modules.interface';
import { AuthService } from '@services/auth.service';
import { ModulesService } from '@services/modules.service';
import { LanguageService } from '@shared/services/language.service';
import { SoftSaveService } from '@shared/services/soft-save.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() isShowSide: boolean = false;
  @Input() pageName: string = '';
  lang: string;
  modules: IModules[] = [];
  constructor(
    private route: Router,
    public LanguageService: LanguageService,
    private modulesService: ModulesService,
    private softSave: SoftSaveService,

    private auth: AuthService
  ) {
    this.lang = this.LanguageService.get_app_lang();
    this.pageName = this.route.url;
    this.modules = this.modulesService.getModules(false);
  }

  ngOnInit(): void {}

  redirect(link: string): void {
    if (link.startsWith('h')) {
      window.location.href = link;
      return;
    }

    window.location.href = 'http://' + window.location.host + link;
  }
  ty: boolean = true;
  translate() {
    this.ty = !this.ty;
  }

  navigate(link: any): void {
    this.softSave.clearFormValue();
    if (link == '/home') {
      this.auth.setSecOption = 'loggedIn';
    }
    // this.route.navigate([link]); // Replace '/new-destination' with your desired route

    // let x = setTimeout(() => {
    //   this.route.navigate([link]); // Replace '/new-destination' with your desired route
    // }, 3000); // 3000 milliseconds = 3 seconds

    // this.confirmationService.confirm({
    //   message: 'Do you want to continue navigating?',

    //   accept: () => {
    //     this.route.navigate([link]); // Replace '/destination' with your desired route
    //   },
    //   reject: () => {
    //     clearTimeout(x);
    //   },
    // });
  }
}
