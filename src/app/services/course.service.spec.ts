import { TestBed } from '@angular/core/testing';

import { CourseService } from './course.service';
import { Course } from '../courses/course-item/course-item.component';

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
    let mockCourse = new Course();
    mockCourse.id = 6;
    mockCourse.title = 'title';
    service.createCourse(new Course());
    expect(spy).toHaveBeenCalledWith('Creating course');
    service.deleteCourse(6);
  });

  it('should log on updateCourse', () => {
    const spy = spyOn(console, 'log');
    const service: CourseService = TestBed.get(CourseService);
    let mockCourse = new Course();
    mockCourse.id = 1;
    mockCourse.title = 'New title';
    service.updateCourse(1, mockCourse);
    expect(service.getCourse(1).title).toEqual('New title');
  });

  it('should get maxId', () => {
    const service: CourseService = TestBed.get(CourseService);
    expect(service.getMaxId()).toEqual(5);
  });
});
