import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { Consts } from '../consts/consts';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { State } from '../store';
import { isAuthentificated } from '../store/auth.actions';
import { LoadingBlockService } from './loading-block.service';
import { BACKEND_PATH } from 'src/environments/environment';

export interface IAuthMessage {
  isAuthentificated: boolean;
  userName?: string;
}

interface ILoginResult {
  token: string;
}

interface IUserInfo {
  name: {
    first: string,
    last: string
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(
    private router: Router,
    private http: HttpClient,
    private loadingBlockService: LoadingBlockService,
    private store: Store<State>
  ) {
    this.store.dispatch(isAuthentificated());
  }

private buildUserName(userInfo: IUserInfo): string {
  return userInfo.name.first + ' ' + userInfo.name.last;
}

  public checkAuth = new Subject<boolean>();
  public getUsername = this.getUserInfo().pipe(map(v => this.buildUserName(v)));
  
  public isAuthentificated(): boolean {
    return this.getToken() != null;
  }

  public getToken(): string {
    return localStorage.getItem(Consts.LS_TOKEN);
  }

  public setToken(token: string) {
    localStorage.setItem(Consts.LS_TOKEN, token);
  }

  public getUserInfo(): Observable<IUserInfo> {
    return this.loadingBlockService.callWithLoadBlock(() =>
      this.http.post<IUserInfo>(`${BACKEND_PATH}/auth/userinfo`, {}));
  }

  public login$(login: string, password: string): Observable<IAuthMessage> {
    console.log('logging$ in');
    return this.loadingBlockService.callWithLoadBlock<ILoginResult>(() =>
    this.http.post<ILoginResult>(`${BACKEND_PATH}/auth/login`, {
      "login": login,
      "password": password
    })).pipe(map(
      v => {
        this.setToken(v.token);
        this.router.navigate(["courses"]);
        return {
          isAuthentificated: true
        };
      }));
  }

  public logout$(): Observable<IAuthMessage> {
    localStorage.removeItem(Consts.LS_USERNAME);
    localStorage.removeItem(Consts.LS_TOKEN);
    this.router.navigate(["login"]);
    return of({ isAuthentificated: false, userName: null });
  }

  public isAuth$(): Observable<boolean> {
    return of(this.isAuthentificated());
  }

  public getToken$(): Observable<string> {
    return of(this.getToken());
  }

  public refreshAuthInfo$(): Observable<IAuthMessage> {
    this.checkAuth.next(this.isAuthentificated());
    return this.isAuthentificated() ?
      this.getUserInfo().pipe(
        map((v) => {
          return {
            isAuthentificated: this.isAuthentificated(),
            userName: this.buildUserName(v)
          }
        })
      ) : of({ isAuthentificated: false, userName: null });
  }

  public refreshAuthInfo() {
    this.checkAuth.next(this.isAuthentificated());
  }
}
