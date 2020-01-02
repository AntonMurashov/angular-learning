import { createAction, props, Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { ICourse } from '../services/course.service';
//import { Todo } from '@todos/models';

export enum CoursesActions {
  LoadCourses = '[Courses Page] Load Courses',
  CoursesLoadedSuccess = '[Courses API] Courses Loaded Success',
  CoursesLoadedError = '[Courses API] Courses Loaded Error',
  LoadMore = '[Courses Page] Load More',
  ResetCoursesCount = '[Courses Page] ResetCoursesCount'
}

export const loadMore = createAction(CoursesActions.LoadMore);
export const resetCoursesCount = createAction(CoursesActions.ResetCoursesCount);

export const loadCourses = createAction(CoursesActions.LoadCourses);

export const loadCoursesSuccess = createAction(
  CoursesActions.CoursesLoadedSuccess, 
  props<{payload: {courses: ICourse[]}}>()
);
/*
export class LoadCourses implements Action {
  readonly type = CoursesActions.LoadCourses
}
*/
export class CoursesLoadedSuccess implements Action {
  readonly type = CoursesActions.CoursesLoadedSuccess

  constructor(public payload: {courses: ICourse[]}) {}
}

export class CoursesLoadedError implements Action {
  readonly type = CoursesActions.CoursesLoadedError
}
