import { ILanguage } from '@interfaces/translate.interface';

/* */
interface ITranslateObject {
  [key: string]: ILanguage;
}
export const translate_object: ITranslateObject | any = {
  global: {
    ar: {},
    en: {},
  },
  test: {
    ar: {
      test:'اختبار'
    },
    en: {
      test: 'Test'
    },
  },
  pages: {
    ar: {
      home: 'الرئيسية',
      postOffices: 'مكاتب الورود',
    },
    en: {
      home: 'Home',
      postOffices: 'Post Offices',
    },},
  auth: {
    ar: {
      oldPassword: 'كلمة السر القديمة',
      newPassword: 'كلمة السر الجديدة',
      confirmPassword: 'تأكيد كلمة السر الجديدة',
    },
    en: {
      oldPassword: 'Old Password',
      newPassword: 'New Password',
      confirmPassword: 'Confirm Password',
    },
}
};
