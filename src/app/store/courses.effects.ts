import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, Effect } from '@ngrx/effects';
import { CourseService, ICourse } from '../services/course.service';
import { catchError, mergeMap, map } from 'rxjs/operators';
import { EMPTY, Observable } from 'rxjs';
import { createAction } from '@ngrx/store';
import { loadCourses1, loadCoursesSuccess } from './courses.actions';



@Injectable()
export class CoursesEffects {

  @Effect()
  loadCoursesEffect$ = createEffect(() => this.actions$.pipe(
    ofType(loadCourses1),
    mergeMap(() => {
      console.log('merging map');
      return this.courseService.findAll()
      .pipe(
        map(courses => { 
          console.log(courses);
          const action = loadCoursesSuccess({payload: courses});
          console.log('action111');
          console.log(action);
          return action; 
          return ({ type: '[Movies API] Movies Loaded Success', payload: courses });
        }),
        catchError(() => EMPTY)
      )})
    )
  );

  constructor(
    private actions$: Actions,
    private courseService: CourseService
  ) { }

}
