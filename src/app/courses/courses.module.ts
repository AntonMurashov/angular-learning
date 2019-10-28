import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CourseItemComponent } from './course-item/course-item.component';



@NgModule({
  declarations: [CoursesComponent, CourseItemComponent],
  exports: [CoursesComponent, CourseItemComponent],
  imports: [
    CommonModule
  ]
})
export class CoursesModule { }
