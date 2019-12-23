import { createReducer, on, State, Action } from '@ngrx/store';
import * as CoursesActions from './courses.actions';
import { CoursesState } from './courses.state';

export const initialState: CoursesState = {
    courses: []
};

const coursesReducer = createReducer(
  initialState, 
  on(CoursesActions.loadCoursesSuccess, (state, action) => {
    console.log('reducing');
    console.log(action.payload);
    console.log(state);
    return {
      ...state,
      courses: action.payload
    };
//    state.courses = course
//    return null; //coursesAdapter.loadCourses(state);
  }),
  /*
  on(TodoActions.addTodo, (state, {todo}) => {
    return todosAdapter.addOne(todo, state);
  }),
  on(TodoActions.updateTodo, (state, {update}) => {
    return todosAdapter.updateOne(update, state);
  }),
  on(TodoActions.deleteTodo, (state, {id}) => {
    return todosAdapter.removeOne(id, state);
  })*/
);

export function reducer(state: CoursesState | undefined, action: Action) {
  return coursesReducer(state, action);
}