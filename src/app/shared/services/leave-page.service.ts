import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LeavePageService {
  // constructor(private confirmationService: ConfirmationService) {}

  // confirmMts(): Observable<boolean> | boolean {
  //   return new Observable<boolean>((observer) => {
  //     const x = setTimeout(() => {
  //       observer.next(true);
  //       observer.complete();
  //       this.confirmationService.close();
  //     }, 3000); // 3000 milliseconds = 3 seconds

  //     this.confirmationService.confirm({
  //       message: 'Do you want to continue navigating?',
  //       accept: () => {
  //         clearTimeout(x);
  //         observer.next(true);
  //         observer.complete();
  //       },
  //       reject: () => {
  //         clearTimeout(x);
  //         observer.next(false);
  //         observer.complete();
  //       },
  //     });
  //   });
  // }
}
