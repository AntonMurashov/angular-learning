import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as Courses from './courses.reducer';
import * as Auth from './auth.reducer';
import { CoursesState } from './courses.state';
import { AuthState } from './auth.state';

export interface State {
  courses: CoursesState,
  auth: AuthState
}

export const reducers: ActionReducerMap<State> = {
  courses: Courses.reducer,
  auth: Auth.reducer
}


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
