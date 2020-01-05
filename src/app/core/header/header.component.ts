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
  isAuth$: Observable<boolean>;
  getUsername$: Observable<string>;

  constructor(private authService: AuthorizationService) {
  }

  ngOnInit() {
    this.isAuth$ = this.authService.checkAuth.asObservable();
    this.getUsername$ = this.authService.getUsername;
  }

  ngDoCheck() {
    this.authService.refreshAuthInfo();
  }

  exit() {
    this.authService.logout();
  }
}
