import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/store';
import { AuthState } from 'src/app/store/auth.state';
import { AuthActions, getAuthInfoAction, logout } from 'src/app/store/auth.actions';
import { getAuthInfo } from 'src/app/store/auth.reducer';

@Component({
  selector: 'angular-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  isAuth$: Observable<boolean>;
  getUsername$: Observable<string>;

  constructor(
    private store: Store<State>,
    ) { }

  ngOnInit() {
  /*  this.isAuth$ = this.authService.checkAuth.asObservable();
    this.getUsername$ = this.authService.getUsername;*/
  }

  ngDoCheck() {
    this.refreshAuthInfo();
  }

  exit() {
    this.store.dispatch(logout()); 
  }
  
  private refreshAuthInfo() {
    console.log('refreshing auth info');
    this.store.dispatch(getAuthInfoAction());
  }

}
