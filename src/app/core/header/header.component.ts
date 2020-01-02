import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/store';
import { AuthState } from 'src/app/store/auth.state';
import { AuthActions, getAuthInfoAction, logout } from 'src/app/store/auth.actions';
import { getAuthInfo } from 'src/app/store/auth.reducer';

@Component({
  selector: 'angular-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth = false;
  userName = '';
  private subscription: Subscription;
  isAuth$: Observable<AuthState>;

  constructor(
    private store: Store<State>,
    ) { }

  ngOnInit() {
    this.isAuth$ = this.store.pipe(select(getAuthInfo));
    this.subscription = this.isAuth$.subscribe(
      v => {
        console.log(v);
        this.isAuth = v.isAuth;
        this.userName = v.userName;
      }
    )
    this.refreshAuthInfo();
//    this.authService.refreshAuthInfo();
  }

  exit() {
    this.store.dispatch(logout()); 
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  private refreshAuthInfo() {
    console.log('refreshing auth info');
    this.store.dispatch(getAuthInfoAction());
  }

}
