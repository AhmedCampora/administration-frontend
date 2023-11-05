import { Injectable } from '@angular/core';
import { LanguageService } from './language.service';
import { Subject } from 'rxjs';
import { IModules } from '@interfaces/modules.interface';
import { PermissionsService } from './permisions.service';
import { PAGES_MODULES } from '@constants/modules.constants';
import { configuration } from 'src/app/config/configuration';

@Injectable({
  providedIn: 'root',
})
export class ModulesService {
  modules: IModules[] = PAGES_MODULES;

  change_modules_headers = new Subject<void>();

  constructor(
    private LanguageService: LanguageService,
    private PermissionsService: PermissionsService
  ) {
    if(configuration.type == 'local'){
      this.setPerInLocalStorage(); // comment this inSecurity
    }
  }

  clearPermissions() {
    this.PermissionsService.permissions = [];
    this.resetModulesPermissions();
  }

  resetModulesPermissions() {
    this.modules.map((module: IModules) => {
      module.permision = false;
    });
  }

  setModulesPermissions() {
    for (let i = 0; i < this.modules.length; i++) {
      this.modules[i].permision = this.PermissionsService.checkPagePermission(
        this.modules[i].routerLink
      );
    }
  }

  getModules(home: boolean = false) {
    this.setModulesPermissions();
    let modules: IModules[] = this.modules.slice();
    let lang = this.LanguageService.get_app_lang();
    modules = this.LanguageService.replace_name_with_lang(modules);
    if (home) {
      let name: 'Home' | 'الرئيسية' = lang == 'ar' ? 'الرئيسية' : 'Home';
      modules = modules.filter((module) => module.name !== name);
    }
    return modules;
  }

  // #appConfiguration
  private setPerInLocalStorage() {
    // alert('sad')
    let x = {
      "username": "superuser",
      "authorities": [
          {
              "authority": "OfficialTelegraph.view"
          },
          {
              "authority": "OfficialTelegraph.viewAll"
          },
          {
              "authority": "TghCustomerDetailsDesktop.view"
          },
          {
              "authority": "TghDailyReportDesktop.ViewAll"
          },
          {
              "authority": "TghDailyReportDesktop.view"
          },
          {
              "authority": "TghExportDesktop.view"
          },
          {
              "authority": "TghGeneratorDesktop.create"
          },
          {
              "authority": "TghIncoming.view"
          },
          {
              "authority": "TghOutcoming.view"
          },
          {
              "authority": "TghPlanCostDesktop.view"
          },
          {
              "authority": "TghTrustedDesktop.view"
          }
      ],
      "userModules": [
          [
              1,
              1,
              "Administration",
              "إدارة مستخدمي النظام",
              "/SystemAdministration/index.jsp"
          ],
          [
              1,
              6,
              "System Data",
              "البيانات الأساسية",
              "/TelegraphBasicData"
          ],
          [
              1,
              3,
              "Incident Management",
              "إدارة البلاغات",
              "/TghIncident"
          ],
          [
              1,
              4,
              "WFM",
              "إدارة الموارد البشرية",
              "/TghWFM/index.jsp"
          ],
          [
              1,
              2,
              "Telegraph Management",
              "إدارة البرقيات ",
              "/TelegraphManagement"
          ],
          [
              1,
              5,
              "WFC",
              "التحكم في سير العمل",
              "/WFC"
          ],
          [
              1,
              8,
              "Telegraph Desktop2",
              "مكتب البرقيات2",
              "/TelegraphDesktop2"
          ],
          [
              1,
              7,
              "Telegraph Desktop",
              "مكتب البرقيات",
              "/TelegraphDesktop"
          ]
      ],
      "displayUser": "Main Screen User",
      "office": "TLG",
      "incoming": 1,
      "outcoming": 1
  };

    localStorage.setItem('authorities', JSON.stringify(x.authorities));
    localStorage.setItem('username', x.username);
    localStorage.setItem('userModules', JSON.stringify(x.userModules));
  }
}
