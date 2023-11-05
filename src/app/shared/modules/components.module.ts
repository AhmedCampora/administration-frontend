import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../components/Modal/modal.component';
import { ConfirmationToastComponent } from '../components/confirmation-toast/confirmation-toast.component';
import { ForbiddenComponent } from '../../layout/forbidden/forbidden.component';
import { MtsTableModule } from './own/table/table.module';
import { MTSFormModule } from './own/form/form.module';
import { PaginatorComponent } from '@shared/components/paginator/paginator.component';
import { HeaderBreadcrumbComponent } from '@shared/components/component-header/component-header.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ModalDraggableDirective } from '@shared/directives/modal-draggable.directive';
import { ChangePasswordComponent } from 'src/app/layout/header/change-password/change-password.component';

@NgModule({
  declarations: [
    ModalComponent,
    ConfirmationToastComponent,
    HeaderBreadcrumbComponent,
    ForbiddenComponent,
    ChangePasswordComponent,
    PaginatorComponent,
    ModalDraggableDirective
  ],
  imports: [
    CommonModule,
    MtsTableModule,
    MTSFormModule,
    BreadcrumbModule
  ],
  exports: [
    ModalComponent,
    ConfirmationToastComponent,
    HeaderBreadcrumbComponent,
    ForbiddenComponent,
    ChangePasswordComponent,
    PaginatorComponent
  ],
})
export class ComponentsModule {}
