import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DatesService {
  dateOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };
  constructor() {}
  convertStringSlashesToHyphen(str: string) {
    return str.replaceAll('/', '-');
  }
  convertSlashesToHyphen(obj: any) {
    for (let prop in obj) {
      if (obj[prop] && prop.toLowerCase().includes('date')) {
        obj[prop] = obj[prop].replaceAll('/', '-');
      }
    }
    return obj; // ret: dd-mm-yyyy
  }

  // take 'date' and return 'string' => 'date time'
  getDateTime(date: any) {
    if (date === null) return '';
    if (date === '') return '';
    if (date === undefined) return '';
    if (date === 'null') return '';
    const formattedDate: string = date
      .toLocaleString('en-US', this.dateOptions)
      .replace(',', '');
    let dateAndTime = formattedDate.split(' ');
    let dateArr: any = dateAndTime[0].split('/');
    let time: any = dateAndTime[1];
    let finalFormat =
      dateArr[0] + '-' + dateArr[1] + '-' + dateArr[2] + ' ' + time + ':00';
    return finalFormat;
  }

  convertDatePropsToString(obj: any) {
    for (let prop in obj) {
      if (obj[prop] && prop.toLowerCase().includes('date')) {
        obj[prop] = obj[prop].toLocaleDateString();
      }
    }
    return obj; // ret: dd/mm/yyyy
  }

  convertStringToDateTime(dateString: string): Date | undefined {
    var dateParts: string[] = [];
    console.log('dateString');
    console.log(dateString);

    if (dateString && typeof dateString === 'string') {
      if (dateString.includes('-')) {
        dateParts = dateString.split('-');
      } else {
        dateParts = dateString.split('/');
      }
      return new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0]);
    }
    return undefined;
  }
}
