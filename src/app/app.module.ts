import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageService } from 'primeng/api';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpErrorInterceptor } from '@core/interceptors/http-error.interceptor';
import { SharedModule } from '@shared/shared.module';
import { LoaderComponent } from 'src/app/layout/loader/loader.component';
import { NotFoundComponent } from 'src/app/layout/not-found/not-found.component';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from '@core/routes/custom-reuse-strategy';
import { LoaderInterceptor } from '@core/interceptors/loader.interceptor';
import { MainLayoutComponent } from './layout/layout.component';
import { AppLayoutComponent } from './layout/mainpage/mainpage.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    AppLayoutComponent,
    LoaderComponent,
    SidebarComponent,
    HeaderComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [
    MessageService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
