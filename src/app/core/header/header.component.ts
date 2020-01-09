import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/store';
import { logout, isAuthentificated, loadToken, loadUserInfo } from 'src/app/store/auth.actions';
import { getUserInfo, getIsAuthentificated } from 'src/app/store/auth.reducer';

@Component({
  selector: 'angular-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth$: Observable<boolean>;
  userName$: Observable<string>;

  constructor(
    private store: Store<State>,
    ) { }

  ngOnInit() {
    this.refreshAuthInfo();
    this.isAuth$ = this.store.pipe(select(getIsAuthentificated));
    this.userName$ = this.store.pipe(select(getUserInfo));
  }

  exit() {
    this.store.dispatch(logout()); 
  }
  
  private refreshAuthInfo() {
    this.store.dispatch(loadToken());
    this.store.dispatch(isAuthentificated());
    this.store.dispatch(loadUserInfo());
  }
}
