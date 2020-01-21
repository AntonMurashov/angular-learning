import { createAction, props } from '@ngrx/store';

export enum SettingsActions {
    SetLanguage = 'Set Language',
    SetLanguageSuccess = 'Set Language Success',
    SetLanguageError = 'Set Language Error'
}

export const setLanguage = createAction(SettingsActions.SetLanguage,
    props<{ language: string }>()
);

export const setLanguageSuccess = createAction(
    SettingsActions.SetLanguageSuccess
);

export const setLanguageError = createAction(
    SettingsActions.SetLanguageError,
    props<{ error: string }>()
);