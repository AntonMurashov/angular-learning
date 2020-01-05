import { createReducer, on, createSelector, Action } from '@ngrx/store';
import * as CoursesActions from './courses.actions';
import { State } from '.';
import { CoursesState } from './courses.state';

export const COUNT_INC = 10;

const initialState: CoursesState = {
  listCount: COUNT_INC,
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
  on(CoursesActions.loadMore, (state) => {
    return {
      ...state,
      listCount: state.listCount + COUNT_INC
    };    
  }),
  on(CoursesActions.resetCoursesCount, (state) => {
    return {
      ...state,
      listCount: COUNT_INC
    };    
  })
);

export function reducer(state: CoursesState = initialState, action: Action) {
  return coursesReducer(state, action);
}

const selectCourses = (state: State) => state.courses;

export const selectCoursesList = createSelector(
  selectCourses,
  (state: CoursesState) => state.courses
)