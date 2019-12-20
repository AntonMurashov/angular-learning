import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LogoComponent } from './header/logo/logo.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, LogoComponent, UserComponent, LoginComponent, NotFoundComponent],
  exports: [HeaderComponent, FooterComponent, LoginComponent, NotFoundComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class CoreModule { }
