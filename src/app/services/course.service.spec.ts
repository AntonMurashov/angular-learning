import { TestBed } from '@angular/core/testing';

import { CourseService } from './course.service';
import { ICourse } from '../courses/course-item/course-item.component';

describe('CourseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CourseService = TestBed.get(CourseService);
    expect(service).toBeTruthy();
  });

  it('should return mockCourses', () => {
    const service: CourseService = TestBed.get(CourseService);
    expect(service.findAll().length).toEqual(5);
  });
});
