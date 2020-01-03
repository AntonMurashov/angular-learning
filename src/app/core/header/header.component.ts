import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AuthorizationService, IAuthMessage } from 'src/app/services/authorization.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'angular-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  isAuth$: Observable<IAuthMessage>;

  constructor(private authService: AuthorizationService) {
    this.isAuth$ = authService.checkAuth;
  }

  ngDoCheck() {
    this.authService.refreshAuth();
  }

  exit() {
    this.authService.logout();
  }
}
