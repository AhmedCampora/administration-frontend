import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from '@services/loader.service';

@Component({
  selector: 'mts-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent {
  isLoading: Observable<boolean>;
  constructor(private loaderService: LoaderService) {
    this.isLoading = this.loaderService.isLoading.asObservable();
  }
}
