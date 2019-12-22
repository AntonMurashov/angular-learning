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
  private subscription: Subscription;

  constructor(private authService: AuthorizationService) {
/*    this.userName = this.authService.getUserInfo();
    this.isAuth = this.authService.isAuthentificated();*/
    this.subscription = authService.checkAuth.subscribe(value => { 
      console.log('checking auth');
      this.isAuth = value.isAuthentificated; 
      this.userName = value.userName;
    });
  }

  ngOnInit() {
    this.authService.refreshAuthInfo();
  }

  exit() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
