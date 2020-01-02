import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { CourseService } from '../services/course.service';
import { catchError, mergeMap, map, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { CoursesActions, CoursesLoadedSuccess, CoursesLoadedError } from './courses.actions';
import { Store } from '@ngrx/store';
import { State } from '.';
import { AuthorizationService } from '../services/authorization.service';
import { AuthActions, AuthLoadedSuccess, AuthLogoutSuccess, AuthLoadedError, AuthLogoutError, 
    AuthLoginSuccess, AuthLoginError, login, logout, isAuthentificated, getAuthInfoAction, getTokenAction, TokenLoadedSuccess, TokenLoadedError } from './auth.actions';

@Injectable()
export class AuthEffects {

    @Effect()
    IsAuthEffect$ = this.actions$.pipe(
      ofType(isAuthentificated),
      mergeMap(() => {
          console.log('checking authentification in effect');
        return this.authService.isAuth$().pipe(
          map(authMessage => {
              console.log(authMessage);
              return of(authMessage);
          }),
          catchError(() => of(new AuthLoadedError()))
        );}
      )
    )
  
    @Effect()
    GetTokenEffect$ = this.actions$.pipe(
      ofType(getTokenAction),
      mergeMap(() => {
          console.log('getting token in effect');
        return this.authService.getToken$().pipe(
          map(token => {
              console.log(token);
              return new TokenLoadedSuccess({ token: token});
          }),
          catchError(() => of(new TokenLoadedError()))
        );}
      )
    )
  
    @Effect()
    GetAuthInfoEffect$ = this.actions$.pipe(
      ofType(getAuthInfoAction),
      mergeMap(() => {
          console.log('getting auth info in effect');
        return this.authService.refreshAuthInfo$().pipe(
          map(authMessage => {
              console.log(authMessage);
              return new AuthLoadedSuccess({ authMessage: authMessage});
          }),
          catchError(() => of(new AuthLoadedError()))
        );}
      )
    )
  
    @Effect()
  LoginEffect$ = this.actions$.pipe(
    ofType(login),
    mergeMap((action) => 
        this.authService.login$(action.username, action.password).pipe(
            map(() => new AuthLoginSuccess()),
            catchError(() => of(new AuthLoginError())
    )))
  )

  @Effect()
  LogoutEffect$ = this.actions$.pipe(
    ofType(logout),
    mergeMap(() => 
        this.authService.logout$().pipe(
            map(() => new AuthLogoutSuccess()),
            catchError(() => of(new AuthLogoutError())
    )))
  )

  constructor(
    private actions$: Actions,
    private authService: AuthorizationService,
    private store: Store<State>
  ) { }

}
