import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/store';
import { logout, isAuthentificated, loadToken, loadUserInfo } from 'src/app/store/auth.actions';
import { getUserInfo, getIsAuthentificated } from 'src/app/store/auth.reducer';
import { TranslateService } from '@ngx-translate/core';
import { getLanguage } from 'src/app/store/settings.reducer';
import { tap } from 'rxjs/operators';
import { setLanguage } from 'src/app/store/settings.actions';

@Component({
  selector: 'angular-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth$: Observable<boolean>;
  userName$: Observable<string>;
  language: string;

  constructor(
    private store: Store<State>
    ) { }

  ngOnInit() {
    this.refreshAuthInfo();
    this.isAuth$ = this.store.pipe(select(getIsAuthentificated));
    this.userName$ = this.store.pipe(select(getUserInfo));
    this.store.pipe(
      select(getLanguage),
      tap(lang => this.language = lang)
    ).subscribe();
  }

  exit() {
    this.store.dispatch(logout()); 
  }
  
  private refreshAuthInfo() {
    this.store.dispatch(loadToken());
    this.store.dispatch(isAuthentificated());
    this.store.dispatch(loadUserInfo());
  }

  onLanguageChanged() {
    this.store.dispatch(setLanguage({ language: this.language }));
  }
}
