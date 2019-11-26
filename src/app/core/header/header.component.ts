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

  constructor(private authService: AuthorizationService) {
    this.isAuth = this.authService.IsAuthentificated();
    authService.checkAuth.subscribe(value => { 
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
