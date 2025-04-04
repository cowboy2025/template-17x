import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHouse } from '@fortawesome/pro-light-svg-icons';
import { MenuModule } from 'primeng/menu';
import { PanelMenuModule } from 'primeng/panelmenu';
import { LayoutModule } from './layout/layout.module';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { ListboxModule } from 'primeng/listbox';
import { InputMaskModule } from 'primeng/inputmask';
import { OAuthService, UrlHelperService } from 'angular-oauth2-oidc';
import { OAuthModule } from 'angular-oauth2-oidc';
import { MfaComponent } from './mfa/mfa.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppHttpInterceptor } from './commons/app-http.interceptor';
import { ProgressBarModule } from 'primeng/progressbar';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [AppComponent, MainPageComponent, MfaComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    LayoutModule,
    MenuModule,
    PanelMenuModule,
    CalendarModule,
    FormsModule,
    ListboxModule,
    InputMaskModule,
    OAuthModule.forRoot(),
    ProgressBarModule,
    DialogModule,
  ],
  providers: [
    OAuthService,
    UrlHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
