import { createAction, props, Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { ICourse } from '../services/course.service';
//import { Todo } from '@todos/models';

export enum CoursesActions {
  LoadCourses = '[Courses Page] Load Courses',
  CoursesLoadedSuccess = '[Courses API] Courses Loaded Success',
  CoursesLoadedError = '[Courses API] Courses Loaded Error'
}
/*
export const loadCourses1 = createAction(
  '[Courses Page] Load Courses'
);
*/
export const loadCoursesSuccess = createAction(
  '[Courses API] Courses Loaded Success', 
  props<{payload: {courses: ICourse[]}}>()
);

export class LoadCourses implements Action {
  readonly type = CoursesActions.LoadCourses
}

export class CoursesLoadedSuccess implements Action {
  readonly type = CoursesActions.CoursesLoadedSuccess

  constructor(public payload: {courses: ICourse[]}) {}
}

export class CoursesLoadedError implements Action {
  readonly type = CoursesActions.CoursesLoadedError
}
