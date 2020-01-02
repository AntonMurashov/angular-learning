import { createReducer, on, Action, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';
import * as AuthActions from './auth.actions';
import { State } from '.';

const initialState: AuthState = {
    userName: '',
    token: '',
    isAuth: false
};

export const authReducer = createReducer(
    initialState,
    on(AuthActions.loadAuthSuccess, (state, action) => {
        console.log(state);
        console.log(action.payload);
        return {
          ...state,
          isAuth: action.payload.authMessage.isAuthentificated,
          userName: action.payload.authMessage.userName
        };
      }),
      on(AuthActions.loadTokenSuccess, (state, action) => {
        console.log(state);
        console.log(action.payload);
        return {
          ...state,
          token: action.payload.token
        };
      }),
    on(AuthActions.login, (state) => {
        return {
            ...state,
            isAuth: true
        };
    }),
    on(AuthActions.logout, (state) => {
        return {
            ...state,
            isAuth: false,
            userName: null
        };
    })
);

export function reducer(state: AuthState = initialState, action: Action) {
    return authReducer(state, action);
}

const token = (state: State) => state.auth.token

export const getToken = createSelector(
    token,
  (state: string) => state
)

const isAuthentificated = (state: State) => state.auth.isAuth;

export const getIsAuthentificated = createSelector(
    isAuthentificated,
  (state: boolean) => state
)

const authInfo = (state: State) => state.auth;

export const getAuthInfo = createSelector(
    authInfo,
  (state: AuthState) => state
)