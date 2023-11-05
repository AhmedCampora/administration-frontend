import { NgModule } from '@angular/core';
import { MTSFormModule } from './form/form.module';
import { MtsTableModule } from './table/table.module';

@NgModule({
  declarations: [],
  imports: [MTSFormModule, MtsTableModule],
  exports: [MTSFormModule, MtsTableModule],
})
export class MTSITModule {}
