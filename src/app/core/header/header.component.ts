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
  _subscription: Subscription;

  constructor(private authService: AuthorizationService) {
    this.isAuth = this.authService.IsAuthentificated();
    this._subscription = authService.checkAuth.subscribe(value => { 
      this.isAuth = value.isAuthentificated; 
      this.userName = value.userName;
    });
  }

  ngOnInit() {
  }

  public exit() {
    this.authService.Logout();
  }
}
