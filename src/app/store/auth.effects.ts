import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { catchError, mergeMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '.';
import { AuthorizationService } from '../services/authorization.service';
import {
  login, logout, isAuthentificated,
  isAuthentificatedSuccess, isAuthentificatedError, loadUserInfoSuccess,
  loadUserInfoError, loadTokenSuccess, loadTokenError, loadToken, loadUserInfo, loginSuccess, logoutSuccess, loginError, logoutError
} from './auth.actions';

@Injectable()
export class AuthEffects {

  @Effect()
  IsAuthEffect$ = this.actions$.pipe(
    ofType(isAuthentificated),
    mergeMap(() => this.authService.isAuth$().pipe(
      map(isAuth => isAuthentificatedSuccess({ isAuth: isAuth })),
      catchError(error => of(isAuthentificatedError({ error }))))
    )
  )

  @Effect()
  GetTokenEffect$ = this.actions$.pipe(
    ofType(loadToken),
    mergeMap(() => this.authService.getToken$().pipe(
      map(token => loadTokenSuccess({ token: token })),
      catchError(error => of(loadTokenError({ error }))))
    )
  )

  @Effect()
  GetUserInfoEffect$ = this.actions$.pipe(
    ofType(loadUserInfo),
    mergeMap(() => this.authService.refreshAuthInfo$().pipe(
      map(authMessage => loadUserInfoSuccess({ userName: authMessage.userName })),
      catchError(error => of(loadUserInfoError({ error }))))
    )
  )

  @Effect()
  LoginEffect$ = this.actions$.pipe(
    ofType(login),
    mergeMap((action) => this.authService.login(action.username, action.password).pipe(
      map(() => loginSuccess()),
      catchError(error => of(loginError({ error }))))
    )
  )

  @Effect()
  LogoutEffect$ = this.actions$.pipe(
    ofType(logout),
    mergeMap(() => this.authService.logout$().pipe(
      map(() => logoutSuccess()),
      catchError(error => of(logoutError({ error }))))
    )
  )

  constructor(
    private actions$: Actions,
    private authService: AuthorizationService,
    private store: Store<State>
  ) { }

}
