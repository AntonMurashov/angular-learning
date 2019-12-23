import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { ICourse } from '../services/course.service';
//import { Todo } from '@todos/models';

export const loadCourses1 = createAction(
  '[Courses Page] Load Courses'
);

export const loadCoursesSuccess = createAction(
  '[Courses API] Courses Loaded Success', 
  props<{payload: ICourse[]}>()
);
/*
export const updateTodo = createAction(
  '[TodoModule] UpdateTodo',
  props<{update: Update<Todo>}>()
);

export const deleteTodo = createAction(
  '[TodoModule] DeleteTodo',
  props<{id: number}>()
);

export const loadTodos = createAction(
  '[TodoModule] LoadTodos',
  props<{todos: Todo[]}>()
);
*/