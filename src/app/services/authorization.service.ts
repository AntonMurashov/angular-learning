import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Consts } from '../consts/consts';
import { Router } from '@angular/router';

export interface IAuthMessage {
  isAuthentificated: boolean;
  userName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private router: Router) { }

  public checkAuth = new Subject<IAuthMessage>();

  public isAuthentificated(): boolean {
    return localStorage.getItem(Consts.LS_TOKEN) != null;
  }

  public getUserInfo(): string {
    return localStorage.getItem(Consts.LS_USERNAME);
  }

  public login(email: string, password: string) {
    localStorage.setItem(Consts.LS_USERNAME, 'Test User' + ' (' + email + ')');
    localStorage.setItem(Consts.LS_TOKEN,'testtoken');
    this.checkAuth.next({
      isAuthentificated: this.isAuthentificated(),
      userName: this.getUserInfo()
    });
    this.router.navigate(["courses"]);
    console.log('Logged in successfully');
  }

  public logout() {
    localStorage.removeItem(Consts.LS_USERNAME);
    localStorage.removeItem(Consts.LS_TOKEN);
    this.checkAuth.next({
      isAuthentificated: this.isAuthentificated(),
      userName: this.getUserInfo()
    });
    this.router.navigate(["login"]);
  }
}
