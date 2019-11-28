import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'angular-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private isAuth = false;
  private userName = '';

  constructor(private authService: AuthorizationService) {
    this.userName = this.authService.getUserInfo();
    this.isAuth = this.authService.isAuthentificated();
    authService.checkAuth.subscribe(value => { 
      this.isAuth = value.isAuthentificated; 
      this.userName = value.userName;
    });
  }

  ngOnInit() {
  }

  public exit() {
    this.authService.logout();
  }
}
