import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesComponent } from './courses.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { CoursesListComponent } from './courses-list/courses-list.component';

const routes: Routes = [
  {
    path: "courses",
    component: CoursesComponent,
    children: [
      {
        path: "",
        component: CoursesListComponent,
      },

      {
        path: "new",
        component: AddCourseComponent,
      },

      {
        path: ":id",
        component: AddCourseComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }

