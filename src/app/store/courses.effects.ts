import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { CourseService } from '../services/course.service';
import { catchError, mergeMap, map, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { CoursesActions, CoursesLoadedSuccess, CoursesLoadedError } from './courses.actions';
import { Store } from '@ngrx/store';
import { State } from '.';

@Injectable()
export class CoursesEffects {

  @Effect()
  loadCoursesEffect$ = this.actions$.pipe(
    ofType(CoursesActions.LoadCourses),
    withLatestFrom(this.store.select('courses')),
    mergeMap(([action, courses]) => {
      return this.courseService.getCourses(0, courses.listCount).pipe(
        map(courses => new CoursesLoadedSuccess({ courses: courses})),
        catchError(() => of(new CoursesLoadedError()))
      );}
    )
  )

  constructor(
    private actions$: Actions,
    private courseService: CourseService,
    private store: Store<State>
  ) { }

}
