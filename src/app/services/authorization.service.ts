import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Consts } from '../consts/consts';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

export interface IAuthMessage {
  isAuthentificated: boolean;
  userName: string;
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
    return localStorage.getItem(Consts.LS_TOKEN) != null;
  }

  private getToken(): string {
    return localStorage.getItem(Consts.LS_TOKEN);
  }
  
  public getUserInfo(): Observable<IUserInfo> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<IUserInfo>(`http://localhost:3004/auth/userinfo`, {
      "token": this.getToken()
    }, httpOptions);
/*    .subscribe(
        v => {
          console.log(v.name.first + ' ' + v.name.last);
        });*/
  }

  public login(login: string, password: string) {
    this.http.post<ILoginResult>(`http://localhost:3004/auth/login`, {
      "login": login,
      "password": password
    })
    .subscribe(
        v => {
          console.log(v.token);
//          localStorage.setItem(Consts.LS_USERNAME, 'Test User' + ' (' + login + ')')
          localStorage.setItem(Consts.LS_TOKEN, v.token);
          this.getUserInfo().subscribe(
            v => {
              console.log(v.name.first + ' ' + v.name.last);
              this.checkAuth.next({
                isAuthentificated: this.isAuthentificated(),
                userName: v.name.first + ' ' + v.name.last
              });
          });
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
}
