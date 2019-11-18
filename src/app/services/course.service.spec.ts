import { TestBed } from '@angular/core/testing';

import { CourseService } from './course.service';

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

  it('should return course on getcourse', () => {
    const service: CourseService = TestBed.get(CourseService);
    expect(service.getCourse(1).id).toEqual(1);
  });

  it('should log on createCourse', () => {
    const spy = spyOn(console, 'log');
    const service: CourseService = TestBed.get(CourseService);
    service.createCourse();
    expect(spy).toHaveBeenCalledWith('AddCourse clicked');
  });

  it('should log on updateCourse', () => {
    const spy = spyOn(console, 'log');
    const service: CourseService = TestBed.get(CourseService);
    service.updateCourse(1);
    expect(spy).toHaveBeenCalledWith('Updating course 1');
  });
});
