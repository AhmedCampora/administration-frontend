import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  Type,
} from '@angular/core';
import { BreadcrumbService } from '@shared/services/breadcrumb-labels.service';
import { TabViewModule } from 'primeng/tabview';
interface Tab {
  header: string;
  component: Type<any> | null;
}
@Component({
  selector: 'mts-tabs-view',
  templateUrl: './tabs-view.component.html',
  styleUrls: ['./tabs-view.component.scss'],
  standalone: true,
  imports: [TabViewModule, CommonModule],
})
export class TabsViewComponent implements OnChanges {
  @Input() activeIndex: number = 0;
  @Input() tabs: Tab[] = [];

  @Output() tabChangedTo = new EventEmitter();

  constructor(private breadCrumbService: BreadcrumbService) {}
  tabChanged(index: any) {
    this.tabChangedTo.emit(index);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tabs']) {
      this.setHeaders(changes['tabs'].currentValue);
    }
  }
  
  private setHeaders(tabs:any[]){
    setTimeout(()=>{
      tabs.map((tab:Tab)=>{
        tab.header = this.breadCrumbService.getLabel(
          tab.header
        );
      })
      this.tabs = tabs;
    }, 200);
  }
}
