import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses/courses.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { AuthorizationGuard } from './services/authorization.guard';
import { LoginComponent } from './core/login/login.component';
import { AddCourseComponent } from './courses/add-course/add-course.component';

export const routes: Routes = [
  {
    path: "",
    redirectTo: "courses",
    pathMatch: "full"
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: "courses",
    loadChildren: () => import('./courses/courses.module').then(mod => mod.CoursesModule)
  },

  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }