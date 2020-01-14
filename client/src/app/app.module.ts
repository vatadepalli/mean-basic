import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/auth/login/login.component';
import {RegisterComponent} from './components/auth/register/register.component';
import {HomeComponent} from './components/layout/home/home.component';
import {NavbarComponent} from './components/layout/navbar/navbar.component';
import {UsersComponent} from './components/pages/users/users.component';
import {AuthService} from './services/auth.service';
import {UsersService} from './services/users.service';

@NgModule({
  declarations: [
    AppComponent, NavbarComponent, HomeComponent, LoginComponent,
    UsersComponent, RegisterComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [AuthService, UsersService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
