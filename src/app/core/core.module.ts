import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { LogoComponent } from './header/logo/logo.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, BreadcrumbComponent, LogoComponent, UserComponent, LoginComponent],
  exports: [HeaderComponent, FooterComponent, BreadcrumbComponent, LoginComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class CoreModule { }
