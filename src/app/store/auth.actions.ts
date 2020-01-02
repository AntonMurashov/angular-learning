import { createAction, props, Action } from '@ngrx/store';
import { IAuthMessage } from '../services/authorization.service';

export enum AuthActions {
    Authentificate = '[Auth API] Authentificate',
    Login = '[Auth API] Login',
    Logout = '[Auth API] Logout',
    IsAuthentificated = '[Auth API] IsAuthentificated',
    GetAuthInfo = '[Auth API] GetAuthInfo',
    GetToken = '[Auth API] GetToken',
    TokenLoadedSuccess = '[Auth API] Token Loaded Success',
    TokenLoadedError = '[Auth API] Token Loaded Error',
    AuthLoadedSuccess = '[Auth API] Auth Loaded Success',
    AuthLoadedError = '[Auth API] Auth Loaded Error',
    AuthLoginSuccess = '[Auth API] Auth Login Success',
    AuthLoginError = '[Auth API] Auth Login Error',
    AuthLogoutSuccess = '[Auth API] Auth Logout Success',
    AuthLogoutError = '[Auth API] Auth Logout Error'
}

export const authentificate = createAction(AuthActions.Authentificate);
export const login = createAction(AuthActions.Login,
    props<{ username: string, password: string }>()
    );
export const logout = createAction(AuthActions.Logout);
export const isAuthentificated = createAction(AuthActions.IsAuthentificated);
export const getTokenAction = createAction(AuthActions.GetToken);
export const getAuthInfoAction = createAction(AuthActions.GetAuthInfo);

export const loadAuthSuccess = createAction(
    AuthActions.AuthLoadedSuccess,
    props<{ payload: { authMessage: IAuthMessage } }>()
);

export const loadTokenSuccess = createAction(
    AuthActions.TokenLoadedSuccess,
    props<{ payload: { token: string } }>()
);

export class AuthLoadedSuccess implements Action {
    readonly type = AuthActions.AuthLoadedSuccess

    constructor(public payload: { authMessage: IAuthMessage }) { }
}

export class TokenLoadedSuccess implements Action {
    readonly type = AuthActions.TokenLoadedSuccess

    constructor(public payload: { token: string }) { }
}

export class AuthLoginSuccess implements Action {
    readonly type = AuthActions.AuthLoginSuccess

    constructor() { }
}

export class AuthLogoutSuccess implements Action {
    readonly type = AuthActions.AuthLogoutSuccess

    constructor() { }
}

export class AuthLoadedError implements Action {
    readonly type = AuthActions.AuthLoadedError
}

export class TokenLoadedError implements Action {
    readonly type = AuthActions.TokenLoadedError
}

export class AuthLoginError implements Action {
    readonly type = AuthActions.AuthLoginError
}

export class AuthLogoutError implements Action {
    readonly type = AuthActions.AuthLogoutError
}