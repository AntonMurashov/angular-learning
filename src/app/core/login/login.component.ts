import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'angular-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email = '';
  public password = '';

  constructor(private authService: AuthorizationService) {
  }

  ngOnInit(): void {
  }

  public isLoginDisabled(): boolean {
    return (this.email == '') || (this.password == '');
  }

  public onLoginClick() {
    this.authService.Login(this.email, this.password);
  }
}