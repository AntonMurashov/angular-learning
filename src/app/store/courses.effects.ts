import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { CourseService } from '../services/course.service';
import { catchError, mergeMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { CoursesActions, CoursesLoadedSuccess, CoursesLoadedError } from './courses.actions';

@Injectable()
export class CoursesEffects {

  @Effect()
  loadCoursesEffect$ = this.actions$.pipe(
    ofType(CoursesActions.LoadCourses),
    mergeMap(() => this.courseService.findAll().pipe(
        map(courses => new CoursesLoadedSuccess({ courses: courses})),
        catchError(() => of(new CoursesLoadedError()))
      )
    )
  )

  constructor(
    private actions$: Actions,
    private courseService: CourseService
  ) { }

}
