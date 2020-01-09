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
  on(AuthActions.loadUserInfoSuccess, (state, action) => {
    return {
      ...state,
      userName: action.userName
    };
  }),
  on(AuthActions.isAuthentificatedSuccess, (state, action) => {
    return {
      ...state,
      isAuth: action.isAuth
    };
  }),
  on(AuthActions.loadTokenSuccess, (state, action) => {
    return {
      ...state,
      token: action.token
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

const userInfo = (state: State) => state.auth.userName;
export const getUserInfo = createSelector(
  userInfo,
  (state: string) => state
)