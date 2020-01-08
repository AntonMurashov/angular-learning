import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { FormsModule } from '@angular/forms';
import { LoadMoreComponent } from './load-more/load-more.component';
import { CheckDateDirective } from '../directives/check-date.directive';
import { NoItemsComponent } from './no-items/no-items.component';
import { DurationPipe } from '../pipes/duration.pipe';
import { OrderByPipe } from '../pipes/order-by.pipe';
import { FindPipe } from '../pipes/find.pipe';
import { AddCourseComponent } from './add-course/add-course.component';
import { CoreModule } from '../core/core.module';
import { CoursesRoutingModule } from './courses-routing.module';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { AuthorizationGuard } from '../services/authorization.guard';
import { BreadcrumbPipe } from '../pipes/breadcrumb.pipe';

@NgModule({
  declarations: [CoursesComponent, CourseItemComponent, LoadMoreComponent, CheckDateDirective, 
    DurationPipe, OrderByPipe, FindPipe, BreadcrumbPipe,
    NoItemsComponent, AddCourseComponent, BreadcrumbComponent, CoursesListComponent],
  exports: [CoursesComponent, CourseItemComponent, LoadMoreComponent, BreadcrumbComponent],
  imports: [
    FormsModule,
    CommonModule,
    CoreModule,
    CoursesRoutingModule
  ],
  providers: [FindPipe, AuthorizationGuard]
})
export class CoursesModule { }
