import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { FormsModule } from '@angular/forms';
import { LoadMoreComponent } from './load-more/load-more.component';



@NgModule({
  declarations: [CoursesComponent, CourseItemComponent, LoadMoreComponent],
  exports: [CoursesComponent, CourseItemComponent, LoadMoreComponent],
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class CoursesModule { }
