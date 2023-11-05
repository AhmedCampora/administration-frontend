import { IFormProps } from "@interfaces/global.interface";

export const change_password_columns: IFormProps[] = [

  {
    header: 'Old Password',
    name: 'oldPassword',
    id: 'old_password',
    defaultValue: '',
    required: true,
    type: 'password',
    status: 'basic',
  },
  {
    header: 'New Password',
    name: 'newPassword',
    id: 'new_password',
    defaultValue: '',
    required: true,
    type: 'password',
    status: 'basic',
  },
  {
    header: 'Confirm Password',
    name: 'confirmPassword',
    id: 'confirm_password',
    defaultValue: '',
    required: true,
    type: 'password',
    status: 'basic',
  },
  {
    header: 'Confirm Password22',
    name: 'confirmPassword22',
    id: 'confirm_password22',
    defaultValue: '',
    required: true,
    type: 'dropdown',
    isDropDown:{
      label: 'name',
      options: [{ name: 'Ahmed'}, {name: 'Ali'}],
      optionsName : 'name',
      filterBy: 'name',
      value : 'name',
    },
    status: 'basic',
  },
];
