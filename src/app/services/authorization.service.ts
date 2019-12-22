import { Injectable } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';
import { Consts } from '../consts/consts';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { createOfflineCompileUrlResolver } from '@angular/compiler';

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

  constructor(private router: Router, private http: HttpClient) { }

  public checkAuth = new Subject<IAuthMessage>();

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

  public login(login: string, password: string) {
    console.log('logging in');
    this.http.post<ILoginResult>(`http://localhost:3004/auth/login`, {
      "login": login,
      "password": password
    }).subscribe(
        v => {
          console.log(v.token);
          this.setToken(v.token);
          this.refreshAuthInfo();
          this.router.navigate(["courses"]);
          console.log('Logged in successfully');
        });
  }

  public logout() {
    localStorage.removeItem(Consts.LS_USERNAME);
    localStorage.removeItem(Consts.LS_TOKEN);
    this.checkAuth.next({
      isAuthentificated: null,
      userName: null
    });
    this.router.navigate(["login"]);
  }

  public refreshAuthInfo() {
    this.getUserInfo().subscribe(
      v => {
        this.checkAuth.next({
          isAuthentificated: this.isAuthentificated(),
          userName: v.name.first + ' ' + v.name.last
        });
    });
  }
}
