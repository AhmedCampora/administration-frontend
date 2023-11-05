import { IModules } from '@interfaces/modules.interface';
// #appConfiguration
export const PAGES_MODULES: IModules[] = [
  {
    name: 'Home',
    en_name: 'Home',
    ar_name: 'الرئيسية',
    src: 'assets/img/TaskList.jpg',
    routerLink: '/home',
    iconName: 'home',
    permision: true,
  },
  {
    name: 'test',
    en_name: 'Test',
    ar_name: 'اختبار',
    src: 'assets/img/TaskList.jpg',
    routerLink: '/test',
    iconName: 'calendar',
    permision: true,
  },
];