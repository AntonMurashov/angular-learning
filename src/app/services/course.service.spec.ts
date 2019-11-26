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

  it('should log on updateCourse', () => {
    const spy = spyOn(console, 'log');
    const service: CourseService = TestBed.get(CourseService);
    service.updateCourse(1);
    expect(spy).toHaveBeenCalledWith('Updating course 1');
  });

  it('should get maxId', () => {
    const service: CourseService = TestBed.get(CourseService);
    expect(service.getMaxId()).toEqual(5);
  });

  it('should create course', () => {
    const service: CourseService = TestBed.get(CourseService);
    service.createCourse();
    expect(service.IsAddingCourse()).toEqual(true);
  });

  it('should cancel saving', () => {
    const service: CourseService = TestBed.get(CourseService);
    service.cancelSaving();
    expect(service.IsAddingCourse()).toEqual(false);
  });

  it('should close creation page on saving course', () => {
    const service: CourseService = TestBed.get(CourseService);    
    service.saveCourse(service.getCourse(1));
    expect(service.IsAddingCourse()).toEqual(false);
  });

  it('should save course', () => {
    const service: CourseService = TestBed.get(CourseService);    
    service.saveCourse(service.getCourse(1));
    expect(service.findAll().length).toEqual(6);
  });
});
