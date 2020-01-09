import { createAction, props } from '@ngrx/store';
import { ICourse } from '../services/course.service';

export enum CoursesActions {

  LoadCourses = '[Courses Page] Load Courses',
  LoadCoursesSuccess = '[Courses API] Courses Loaded Success',
  LoadCoursesError = '[Courses API] Courses Loaded Error',

  DeleteCourse = '[Courses Page] Delete Course',
  DeleteCourseSuccess = '[Courses API] Delete Course Success',
  DeleteCourseError = '[Courses API] Delete Course Error',

  LoadMore = '[Courses Page] Load More',
  ResetCoursesCount = '[Courses Page] ResetCoursesCount'
}

export const loadMore = createAction(CoursesActions.LoadMore);
export const resetCoursesCount = createAction(CoursesActions.ResetCoursesCount);

export const loadCourses = createAction(CoursesActions.LoadCourses,
  props<{ searchStr: string }>()
);

export const deleteCourse = createAction(CoursesActions.DeleteCourse,
  props<{ id: number }>()
);

export const loadCoursesSuccess = createAction(
  CoursesActions.LoadCoursesSuccess, 
  props<{courses: ICourse[]}>()
);

export const loadCoursesError = createAction(
  CoursesActions.LoadCoursesError,
  props<{ error: string }>()
);

export const deleteCourseSuccess = createAction(
  CoursesActions.DeleteCourseSuccess
);

export const deleteCourseError = createAction(
  CoursesActions.DeleteCourseError,
  props<{ error: string }>()
);
