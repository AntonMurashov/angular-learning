import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'angular-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth = false;
  userName = '';
  private _subscription: Subscription;

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

  exit() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
