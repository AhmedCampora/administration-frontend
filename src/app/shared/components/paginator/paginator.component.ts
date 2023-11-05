import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { DEBOUNCE_TIME } from '@constants/global.constants';
import { SharedService } from '@shared/services/shared.service';
import { SoftSaveService } from '@shared/services/soft-save.service';
import { MenuItem } from 'primeng/api';
import { Subject, debounceTime } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BreadcrumbService } from '../../services/breadcrumb-labels.service';

@Component({
  selector: 'mts-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnDestroy, OnChanges {
  private destroyRef = inject(DestroyRef);
  private index_obs: Subject<number> = new Subject();
  private ngUnsubscribe = new Subject();
  @Output() moveTo = new EventEmitter();
  size: number = 1;
  current: number = 1;
  ids: any[] = [];

  constructor(
    private sharedService: SharedService,
    private breadCrumbService: BreadcrumbService,
    private softSave: SoftSaveService
  ) {
    this.trackIds();
  }

  trackIds() {
    [this.ids, this.current] = this.softSave.getIdsFromLS();
    this.size = this.ids.length;
    this.index_obs
      .pipe(
        debounceTime(DEBOUNCE_TIME),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((index) => {
        this.moveTo.emit(this.ids[index]);
        this.softSave.setIndInLS(index);
      });
  }
  go_to_page(index: number) {
    this.current = index;
    this.index_obs.next(index - 1);
  }

  items = [];
  home: MenuItem = {};

  clicked(e: any) {
    this.softSave.softSave$ = true;
  }

  @Input() breadcrumb: any;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['breadcrumb'].currentValue) {
      let x = changes['breadcrumb'].currentValue;
      this.home.routerLink = x.url;
      this.items = this.getTitles(x.titles);
      // console.log(`items`);
      // console.log(this.items);
    }
  }

  getTitles(arr: any) {
    return arr.map((x: string) => {
      return { label: this.breadCrumbService.getLabel(x) };
    });
  }
  
  ngOnDestroy() {
    this.ngUnsubscribe.next('');
    this.ngUnsubscribe.complete();
    this.ngUnsubscribe = new Subject();
  }
}
