import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { CourseService } from '../services/course.service';
import { catchError, mergeMap, map, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { loadCourses, deleteCourse, deleteCourseSuccess, deleteCourseError, loadCoursesSuccess, loadCoursesError } from './courses.actions';
import { Store } from '@ngrx/store';
import { State } from '.';

@Injectable()
export class CoursesEffects {

  @Effect()
  loadCoursesEffect$ = this.actions$.pipe(
    ofType(loadCourses),
    withLatestFrom(this.store),
    mergeMap(([action, state]) => this.courseService.getCourses(0, state.courses.listCount, action.searchStr).pipe(
        map(courses => loadCoursesSuccess({ courses: courses})),
        catchError(error => of(loadCoursesError({ error })))
      )
    )
  )

  @Effect()
  deleteCourseEffect$ = this.actions$.pipe(
    ofType(deleteCourse),
    mergeMap((action) => this.courseService.deleteCourse(action.id).pipe(
        map(() => deleteCourseSuccess()),
        catchError(error => of(deleteCourseError({ error })))
      )
    )
  )

  constructor(
    private actions$: Actions,
    private courseService: CourseService,
    private store: Store<State>
  ) { }

}
