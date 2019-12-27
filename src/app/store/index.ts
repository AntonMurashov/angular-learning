import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as Courses from './courses.reducer';
import { CoursesState } from './courses.state';

export interface State {
  courses: CoursesState
}

export const reducers: ActionReducerMap<State> = {
  courses: Courses.reducer
}


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
