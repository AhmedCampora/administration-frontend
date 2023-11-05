import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { BreadcrumbModule } from 'primeng/breadcrumb';

const primengModules: any[] = [
  ButtonModule,
  ConfirmDialogModule,
  ToastModule,
  BreadcrumbModule
];

@NgModule({
  imports: [...primengModules],
  exports: [...primengModules],
})
export class PrimengModule {}
