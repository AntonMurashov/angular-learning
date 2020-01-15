import { createAction, props } from '@ngrx/store';

export enum AuthActions {
    Login = '[Auth API] Login',
    LoginSuccess = '[Auth API] Login Success',
    LoginError = '[Auth API] Login Error',

    Logout = '[Auth API] Logout',
    LogoutSuccess = '[Auth API] Logout Success',
    LogoutError = '[Auth API] Logout Error',

    IsAuthentificated = '[Auth API] IsAuthentificated',
    IsAuthentificatedSuccess = '[Auth API] IsAuthentificated Success',
    IsAuthentificatedError = '[Auth API] IsAuthentificated Error',

    LoadToken = '[Auth API] Load Token',
    LoadTokenSuccess = '[Auth API] Load Token Success',
    LoadTokenError = '[Auth API] Load Token Error',

    LoadUserInfo = '[Auth API] Load UserInfo',
    LoadUserInfoSuccess = '[Auth API] Load UserInfo Success',
    LoadUserInfoError = '[Auth API] Load UserInfo Error'
}

export const login = createAction(AuthActions.Login,
    props<{ username: string, password: string }>()
);
export const logout = createAction(AuthActions.Logout);
export const isAuthentificated = createAction(AuthActions.IsAuthentificated);
export const loadToken = createAction(AuthActions.LoadToken);
export const loadUserInfo = createAction(AuthActions.LoadUserInfo);


export const loginSuccess = createAction(AuthActions.LoginSuccess);

export const loginError = createAction(
    AuthActions.LoginError,
    props<{ error: string }>()
);

export const logoutSuccess = createAction(AuthActions.LogoutSuccess);

export const logoutError = createAction(
    AuthActions.LogoutError,
    props<{ error: string }>()
);

export const isAuthentificatedSuccess = createAction(
    AuthActions.IsAuthentificatedSuccess,
    props<{ isAuth: boolean }>()
);

export const isAuthentificatedError = createAction(
    AuthActions.IsAuthentificatedError,
    props<{ error: string }>()
);

export const loadTokenSuccess = createAction(
    AuthActions.LoadTokenSuccess,
    props<{ token: string }>()
);

export const loadTokenError = createAction(
    AuthActions.LoadTokenError,
    props<{ error: string }>()
);

export const loadUserInfoSuccess = createAction(
    AuthActions.LoadUserInfoSuccess,
    props<{ userName: string }>()
);

export const loadUserInfoError = createAction(
    AuthActions.LoadUserInfoError,
    props<{ error: string }>()
);

