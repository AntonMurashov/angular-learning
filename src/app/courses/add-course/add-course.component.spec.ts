import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseComponent } from './add-course.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DurationPipe } from 'src/app/pipes/duration.pipe';
import { CourseService } from 'src/app/services/course.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { routes } from 'src/app/app-routing.module';
import { CoursesModule } from '../courses.module';
import { CoreModule } from 'src/app/core/core.module';

describe('AddCourseComponent', () => {
  let component: AddCourseComponent;
  let fixture: ComponentFixture<AddCourseComponent>;
  let courseService: CourseService;
  let breadcrumbService: BreadcrumbService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        CommonModule,
        CoursesModule,
        CoreModule,
        RouterTestingModule.withRoutes(routes) 
      ],
      providers: [CourseService, BreadcrumbService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseComponent);
    component = fixture.componentInstance;
    courseService = TestBed.get(CourseService);
    breadcrumbService = TestBed.get(BreadcrumbService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable saving on empty name', () => {
    component.course.name = '';
    fixture.detectChanges();
    expect(component.isSaveDisabled()).toEqual(true);
  });
});
