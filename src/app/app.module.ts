import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CoursesComponent } from './courses/courses.component';
import { CourseItemComponent } from './courses/course-item/course-item.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    CourseItemComponent
  ],
  imports: [
    BrowserModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
