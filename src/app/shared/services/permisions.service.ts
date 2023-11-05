import { Injectable } from '@angular/core';
import { pagesPermissionsMap } from '@constants/permissions.constants';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  pagesPermissionsMap = pagesPermissionsMap;
  permissions: string[] = [];
  constructor() {}

  checkPagePermission(pageName: string): boolean {
    if (this.permissions.length == 0) {
      this.setPermissions();
    }
    if (pageName == '/home' || pageName == '/test') return true;
    let permissions = this.pagesPermissionsMap.get(pageName);
    if (permissions === undefined) return false;
    for (let permission of permissions) {
      if (this.permissions.includes(permission)) {
        return true;
      }
    }
    return false;
  }

  private setPermissions() {
    try {
      let permissions = localStorage.getItem('authorities');
      if (permissions !== null) {
        let x = JSON.parse(permissions);
        this.permissions = x.map((x: any) => x.authority);        
      }
    } catch (e) {
      this.permissions = [];
    }
  }

  havePermissions(permission: string[]): boolean[] {
    if (this.permissions.length === 0) {
      this.setPermissions();
    }
    let arr: boolean[] = [];
    for (let i = 0; i < permission.length; i++) {
      arr[i] = this.permissions.includes(permission[i]);
    }
    return arr;
  }

  clearPermissions(){
    this.permissions = [];
  }
}
