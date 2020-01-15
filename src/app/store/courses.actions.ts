import { createAction, props } from '@ngrx/store';
import { ICourse } from '../services/course.service';

export enum CoursesActions {

  LoadCourses = '[Courses Page] Load Courses',
  LoadCoursesSuccess = '[Courses API] Courses Loaded Success',
  LoadCoursesError = '[Courses API] Courses Loaded Error',

  GetCourse = '[Courses Page] Get Course',
  GetCourseSuccess = '[Courses API] Get Course Success',
  GetCourseError = '[Courses API] Get Course Error',

  CreateCourse = '[Courses Page] Create Course',
  CreateCourseSuccess = '[Courses API] Create Course Success',
  CreateCourseError = '[Courses API] Create Course Error',

  UpdateCourse = '[Courses Page] Update Course',
  UpdateCourseSuccess = '[Courses API] Update Course Success',
  UpdateCourseError = '[Courses API] Update Course Error',

  DeleteCourse = '[Courses Page] Delete Course',
  DeleteCourseSuccess = '[Courses API] Delete Course Success',
  DeleteCourseError = '[Courses API] Delete Course Error',

  GetMaxCourseId = '[Courses Page] GetMaxCourseId',
  GetMaxCourseIdSuccess = '[Courses API] GetMaxCourseId Success',
  GetMaxCourseIdError = '[Courses API] GetMaxCourseId Error',

  LoadMore = '[Courses Page] Load More',
  ResetCoursesCount = '[Courses Page] ResetCoursesCount'
}

export const loadMore = createAction(CoursesActions.LoadMore);
export const resetCoursesCount = createAction(CoursesActions.ResetCoursesCount);

export const loadCourses = createAction(CoursesActions.LoadCourses,
  props<{ searchStr: string }>()
);

export const getCourse = createAction(CoursesActions.GetCourse,
  props<{ id: number }>()
);

export const createCourse = createAction(CoursesActions.CreateCourse,
  props<{ course: ICourse }>()
);

export const updateCourse = createAction(CoursesActions.UpdateCourse,
  props<{ id: number, course: ICourse }>()
);

export const deleteCourse = createAction(CoursesActions.DeleteCourse,
  props<{ id: number }>()
);

export const getMaxCourseId = createAction(CoursesActions.GetMaxCourseId);

export const loadCoursesSuccess = createAction(
  CoursesActions.LoadCoursesSuccess, 
  props<{courses: ICourse[]}>()
);

export const loadCoursesError = createAction(
  CoursesActions.LoadCoursesError,
  props<{ error: string }>()
);

export const getCourseSuccess = createAction(
  CoursesActions.GetCourseSuccess, 
  props<{course: ICourse}>()
);

export const getCourseError = createAction(
  CoursesActions.GetCourseError,
  props<{ error: string }>()
);

export const createCourseSuccess = createAction(
  CoursesActions.CreateCourseSuccess
);

export const createCourseError = createAction(
  CoursesActions.CreateCourseError,
  props<{ error: string }>()
);

export const updateCourseSuccess = createAction(
  CoursesActions.UpdateCourseSuccess
);

export const updateCourseError = createAction(
  CoursesActions.UpdateCourseError,
  props<{ error: string }>()
);

export const deleteCourseSuccess = createAction(
  CoursesActions.DeleteCourseSuccess
);

export const deleteCourseError = createAction(
  CoursesActions.DeleteCourseError,
  props<{ error: string }>()
);

export const getMaxCourseIdSuccess = createAction(
  CoursesActions.GetMaxCourseIdSuccess, 
  props<{id: number}>()
);

export const getMaxCourseIdError = createAction(
  CoursesActions.GetMaxCourseIdError,
  props<{ error: string }>()
);
