import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { CourseService } from '../services/course.service';
import { catchError, mergeMap, map, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { loadCourses, deleteCourse, deleteCourseSuccess, deleteCourseError, loadCoursesSuccess, loadCoursesError, 
  getMaxCourseId, getMaxCourseIdSuccess, getCourse, getCourseSuccess, getCourseError, createCourse, updateCourse, 
  createCourseSuccess, createCourseError, updateCourseSuccess, updateCourseError } from './courses.actions';
import { Store } from '@ngrx/store';
import { State } from '.';

@Injectable()
export class CoursesEffects {

  @Effect()
  loadCoursesEffect$ = this.actions$.pipe(
    ofType(loadCourses),
    withLatestFrom(this.store),
    mergeMap(([action, state]) => this.courseService.getCourses(0, state.courses.listCount, action.searchStr).pipe(
      map(courses => loadCoursesSuccess({ courses: courses })),
      catchError(error => of(loadCoursesError({ error }))))
    )
  )

  @Effect()
  getCourseEffect$ = this.actions$.pipe(
    ofType(getCourse),
    mergeMap((action) => this.courseService.getCourse(action.id).pipe(
      map(course => getCourseSuccess({ course: course })),
      catchError(error => of(getCourseError({ error }))))
    )
  )

  @Effect()
  createCourseEffect$ = this.actions$.pipe(
    ofType(createCourse),
    mergeMap((action) => this.courseService.createCourse(action.course).pipe(
      map(() => createCourseSuccess()),
      catchError(error => of(createCourseError({ error }))))
    )
  )
  @Effect()
  updateCourseEffect$ = this.actions$.pipe(
    ofType(updateCourse),
    mergeMap((action) => this.courseService.updateCourse(action.id, action.course).pipe(
      map(() => updateCourseSuccess()),
      catchError(error => of(updateCourseError({ error }))))
    )
  )
  @Effect()
  deleteCourseEffect$ = this.actions$.pipe(
    ofType(deleteCourse),
    mergeMap((action) => this.courseService.deleteCourse(action.id).pipe(
      map(() => deleteCourseSuccess()),
      catchError(error => of(deleteCourseError({ error }))))
    )
  )

  @Effect()
  getMaxIdEffect$ = this.actions$.pipe(
    ofType(getMaxCourseId),
    mergeMap(() => this.courseService.getMaxId().pipe(
      map(id => getMaxCourseIdSuccess({ id: id })),
      catchError(error => of(deleteCourseError({ error }))))
    )
  )

  constructor(
    private actions$: Actions,
    private courseService: CourseService,
    private store: Store<State>
  ) { }

}
