import { createReducer, on, createSelector, Action } from '@ngrx/store';
import * as CoursesActions from './courses.actions';
import { State } from '.';
import { CoursesState } from './courses.state';

const initialState: CoursesState = {
    courses: []
};

export const coursesReducer = createReducer(
  initialState, 
  on(CoursesActions.loadCoursesSuccess, (state, action) => {
    return {
      ...state,
      courses: action.payload.courses
    };
  }),
);

export function reducer(state: CoursesState = initialState, action: Action) {
  return coursesReducer(state, action);
}

const selectCourses = (state: State) => state.courses;

export const selectCoursesList = createSelector(
  selectCourses,
  (state: CoursesState) => state.courses
)