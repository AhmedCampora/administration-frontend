// #appConfiguration
export const pagesPermissionsMap = new Map<string, string[]>([
  ['/postOffices', ['TghPostOffice.view']],
  ['/postOffices/Edit', ['TghPostOffice.update']],
  ['/postOffices/Add', ['TghPostOffice.create']],
]);
