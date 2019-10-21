import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { LogoComponent } from './header/logo/logo.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, BreadcrumbComponent, LogoComponent, UserComponent],
  exports: [HeaderComponent, FooterComponent, BreadcrumbComponent],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
