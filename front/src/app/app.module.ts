import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { DropdownModule } from 'primeng/dropdown';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { ShortTableComponent } from './short-table/short-table.component';
import {MatTableModule} from '@angular/material/table';
import { SvgComponent } from './svg/svg.component';
import {SVGListenerService} from './utils/SVGListener.service';
import { AuthErrorPageComponent } from './auth-error-page/auth-error-page.component';
import {AuthInterceptor} from './utils/AuthInterceptor';
import {Router} from '@angular/router';
import {LogoutListenerService} from './utils/LogoutListener.sevice';
import { HeaderAuthComponent } from './header-auth/header-auth.component';
import { RegisteringComponent } from './registering/registering.component';
import { FullTableComponent } from './full-table/full-table.component';
import {TableModule} from 'primeng/table';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    HeaderComponent,
    ShortTableComponent,
    SvgComponent,
    AuthErrorPageComponent,
    HeaderAuthComponent,
    RegisteringComponent,
    FullTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    DropdownModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatTableModule,
    TableModule,
  ],
  providers: [
    SVGListenerService,
    LogoutListenerService,
    {
      provide: HTTP_INTERCEPTORS,
      useFactory(router: Router): AuthInterceptor {
        return new AuthInterceptor(router);
      },
      multi: true,
      deps: [Router]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
