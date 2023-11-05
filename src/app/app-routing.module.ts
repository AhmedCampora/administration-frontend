import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from '@core/authentication/authentication.component';
import { canActivateGuard } from '@core/guards/can-activate.guard';
import { ForbiddenComponent } from 'src/app/layout/forbidden/forbidden.component';
import { NotFoundComponent } from 'src/app/layout/not-found/not-found.component';
import { MainLayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: AuthenticationComponent,
  },
  {
    path: 'home',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('@shared/modules/home/home.module').then(
        (m) => m.HomeModule
      ),
  },
  {
    path: 'forbidden',
    component: MainLayoutComponent,
    canActivate: [canActivateGuard],
    children: [
      {
        path: '',
        component: ForbiddenComponent,
      },
    ],
  },
  {
    path: 'test',
    component: MainLayoutComponent,
    loadChildren: () =>
      import('@modules/test/test.module').then(
        (m) => m.TestModule
      ),
  },
  {
    path: '**', 
    // component: NotFoundComponent, // #appConfiguration
    component: MainLayoutComponent,
    loadChildren: () =>
      import('@modules/test/test.module').then((m) => m.TestModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    bindToComponentInputs: true 
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
