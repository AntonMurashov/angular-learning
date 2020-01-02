import { Injectable } from '@angular/core';
import { Subject, Observable, Subscription, of } from 'rxjs';
import { Consts } from '../consts/consts';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';
import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { Store } from '@ngrx/store';
import { State } from '../store';
import { authentificate, logout, isAuthentificated } from '../store/auth.actions';

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
    private store: Store<State>
  ) {
    this.store.dispatch(isAuthentificated());
  }

  public checkAuth = new Subject<IAuthMessage>();
  public checkAuth$: Observable<IAuthMessage>;

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
    return this.http.post<IUserInfo>(`http://localhost:3004/auth/userinfo`, {});
  }
  /*
    public login(login: string, password: string) {
      console.log('logging in');
      this.http.post<ILoginResult>(`http://localhost:3004/auth/login`, {
        "login": login,
        "password": password
      }).subscribe(
          v => {
            console.log(v.token);
            this.setToken(v.token);
  //          this.refreshAuthInfo();
            this.router.navigate(["courses"]);
            console.log('Logged in successfully');
          });
    }
  */
  public login$(login: string, password: string): Observable<IAuthMessage> {
    console.log('logging$ in');
    return this.http.post<ILoginResult>(`http://localhost:3004/auth/login`, {
      "login": login,
      "password": password
    }).pipe(map(
      v => {
        console.log(v.token);
        this.setToken(v.token);
        this.router.navigate(["courses"]);
        return {
          isAuthentificated: true
        };
      }));
  }

  /*
    public logout() {
      localStorage.removeItem(Consts.LS_USERNAME);
      localStorage.removeItem(Consts.LS_TOKEN);
      this.router.navigate(["login"]);
    }*/
  /*
    public refreshAuthInfo() {
      this.getUserInfo().subscribe(
        v => {
          this.checkAuth.next({
            isAuthentificated: this.isAuthentificated(),
            userName: v.name.first + ' ' + v.name.last
          });
      });
    }
  */
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
    return this.isAuthentificated() ?
      this.getUserInfo().pipe(
        map((v) => {
          return {
            isAuthentificated: this.isAuthentificated(),
            userName: v.name.first + ' ' + v.name.last
          }
        })
      ) : of({ isAuthentificated: false, userName: null });
  }
}
