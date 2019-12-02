import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { LogoComponent } from './header/logo/logo.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, BreadcrumbComponent, LogoComponent, UserComponent, LoginComponent, NotFoundComponent],
  exports: [HeaderComponent, FooterComponent, BreadcrumbComponent, LoginComponent, NotFoundComponent],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule
  ]
})
export class CoreModule { }
