import { createReducer, on, createSelector, Action } from '@ngrx/store';
import * as CoursesActions from './courses.actions';
import { State } from '.';
import { CoursesState } from './courses.state';
import { Consts } from './../consts/consts';

const initialState: CoursesState = {
  listCount: Consts.COURSES_COUNT_INC,
  courses: [],
  maxId: 0,
  currentCourse: null
};

export const coursesReducer = createReducer(
  initialState,
  on(CoursesActions.loadCoursesSuccess, (state, action) => {
    return {
      ...state,
      courses: action.courses
    };
  }),
  on(CoursesActions.getCourseSuccess, (state, action) => {
    return {
      ...state,
      currentCourse: action.course
    };
  }),
  on(CoursesActions.loadMore, (state) => {
    return {
      ...state,
      listCount: state.listCount + Consts.COURSES_COUNT_INC
    };    
  }),
  on(CoursesActions.resetCoursesCount, (state) => {
    return {
      ...state,
      listCount: Consts.COURSES_COUNT_INC
    };    
  }),
  on(CoursesActions.getMaxCourseIdSuccess, (state, action) => {
    return {
      ...state,
      maxId: action.id
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
export const selectMaxCourseId = createSelector(
  selectCourses,
  (state: CoursesState) => state.maxId
)
export const selectCourse = createSelector(
  selectCourses,
  (state: CoursesState) => state.currentCourse
)