import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BreadcrumbService } from '../../services/breadcrumb-labels.service';
@Component({
  selector: 'mts-header-breadcrumb',
  template: `
    <h3 class="fs-4">{{ titleName }}</h3>
    `,
})
export class HeaderBreadcrumbComponent implements OnChanges {
  @Input() title: string = '';
  titleName: string = '';

  constructor(private breadcrumbService: BreadcrumbService) {}

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(`changes`);
    // console.log(changes);

    // console.log(`changes['title']`);
    // console.log(changes['title']);
    if (changes['title'].currentValue) {
      this.titleName = this.breadcrumbService.getLabel(
        changes['title'].currentValue
      );
    }
  }
}
