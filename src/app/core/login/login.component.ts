import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store';
import { login } from 'src/app/store/auth.actions';

@Component({
  selector: 'angular-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  public email = '';
  public password = '';

  constructor(private store: Store<State>,) {
  }

  ngOnInit(): void {
  }

  public isLoginDisabled(): boolean {
    return (this.email == '') || (this.password == '');
  }

  public onLoginClick() {
    this.store.dispatch(login({username: this.email, password: this.password})); 
    //this.authService.login(this.email, this.password);
  }
}
