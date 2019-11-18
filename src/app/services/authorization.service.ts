import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface IAuthMessage {
  isAuthentificated: boolean;
  userName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor() { }

  public checkAuth = new Subject<IAuthMessage>();
  private userName = '';
  private token = '';

  public IsAuthentificated(): boolean {
    return this.token != '';
  }

  public GetUserInfo(): string {
    return this.userName;
  }

  public Login(email: string, password: string) {
    this.userName = 'Test User' + ' (' + email + ')';
    this.token = 'testtoken';
    this.checkAuth.next({
      isAuthentificated: this.IsAuthentificated(),
      userName: this.GetUserInfo()
    });
    console.log('Logged in successfully');
  }

  public Logout() {
    this.userName = '';
    this.token = '';
    this.checkAuth.next({
      isAuthentificated: this.IsAuthentificated(),
      userName: this.GetUserInfo()
    });
  }
}
