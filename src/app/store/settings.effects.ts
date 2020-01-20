import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { SettingsService } from '../services/settings.service';
import { setLanguage, setLanguageSuccess, setLanguageError } from './settings.actions';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class SettingsEffects {

  @Effect()
  setLanguageEffect$ = this.actions$.pipe(
    ofType(setLanguage),
    mergeMap((action) => this.settingsService.setLanguage(action.language).pipe(
      map(() => setLanguageSuccess()),
      catchError(error => of(setLanguageError({ error }))))
    )
  )

  constructor(
    private actions$: Actions,
    private settingsService: SettingsService
  ) { }
}
