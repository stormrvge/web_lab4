import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {MainComponent} from './main/main.component';
import {AuthErrorPageComponent} from './auth-error-page/auth-error-page.component';
import {RegisteringComponent} from './registering/registering.component';
import {FullTableComponent} from './full-table/full-table.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisteringComponent},
  {path: 'main', component: MainComponent},
  {path: 'results', component: FullTableComponent},
  {path: 'auth-error', component: AuthErrorPageComponent},
  {path: '',   redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
