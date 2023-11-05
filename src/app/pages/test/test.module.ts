import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { TestChildComponent } from './test-child/test-child.component';

const routes: Routes = [
  {
    path: '',
    component: TestComponent,
  },
  {
    path: 'child',
    component: TestChildComponent,
  }
];

@NgModule({
  declarations: [TestComponent, TestChildComponent],
  imports: [CommonModule, RouterModule.forChild(routes),SharedModule],
})
export class TestModule {}
