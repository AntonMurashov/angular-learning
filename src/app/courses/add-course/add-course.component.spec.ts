import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseComponent } from './add-course.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DurationPipe } from 'src/app/pipes/duration.pipe';
import { By } from '@angular/platform-browser';
import { CourseService } from 'src/app/services/course.service';

describe('AddCourseComponent', () => {
  let component: AddCourseComponent;
  let fixture: ComponentFixture<AddCourseComponent>;
  let courseService: CourseService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCourseComponent, DurationPipe ],
      imports: [
        FormsModule,
        CommonModule
      ],
      providers: [CourseService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseComponent);
    component = fixture.componentInstance;
    courseService = TestBed.get(CourseService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable saving on empty title', () => {
    component.title = '';
    fixture.detectChanges();
    expect(component.isSaveDisabled()).toEqual(true);
  });

  it('should call createCourse', () => {
    let spy = spyOn(courseService, 'createCourse');
    component.title = '123';
    fixture.detectChanges();
    let button = fixture.debugElement.query(By.css('button.save-button')).nativeElement;
    button.click();

    expect(spy).toHaveBeenCalled();
  });
});
