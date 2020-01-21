import { createReducer, on, Action, createSelector } from '@ngrx/store';
import { State } from '.';
import { SettingsState } from './settings.state';
import * as SettingsActions from './settings.actions';

const initialState: SettingsState = {
  language: 'en'
};

export const settingsReducer = createReducer(
  initialState,
  on(SettingsActions.setLanguage, (state, action) => {    
    return {
      ...state,
      language: action.language
    };
  })
);

export function reducer(state: SettingsState = initialState, action: Action) {
  return settingsReducer(state, action);
}

const language = (state: State) => state.settings.language;
export const getLanguage = createSelector(
  language,
  (state: string) => state
)