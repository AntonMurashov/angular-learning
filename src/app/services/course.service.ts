import { Injectable } from '@angular/core';
import { Course, ICourse } from '../courses/course-item/course-item.component';
import { Subject } from 'rxjs';

export interface IAddCourseMessage {
  isAddingCourse: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor() { }

  public checkAddCourse = new Subject<IAddCourseMessage>();
  private isAddingCourse = false;

  private mockCourses: Course[] =
    [
      {
        id: 1,
        title: "Video Course 1. Name 1",
        creationDate: new Date(2019, 10, 29),
        durationMin: 90,
        description: "Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college's classes. They're published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.",
        topRated: true
      },
      {
        id: 2,
        title: "Video Course 2. Name 2",
        creationDate: new Date(2019, 9, 7),
        durationMin: 120,
        description: "Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college's classes. They're published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester.",
        topRated: false
      },
      {
        id: 3,
        title: "Video Course 3. Name 3",
        creationDate: new Date(2019, 10, 8),
        durationMin: 45,
        description: "description3 description3 description3",
        topRated: false
      },
      {
        id: 4,
        title: "Video Course 4. Name 4",
        creationDate: new Date(2017, 1, 5),
        durationMin: 90,
        description: "description4",
        topRated: true
      },
      {
        id: 5,
        title: "Video Course 5. Name 5",
        creationDate: new Date(2019, 2, 15),
        durationMin: 120,
        description: "description5",
        topRated: false
      }
    ];


  public findAll(): ICourse[] {
    return this.mockCourses;
  }

  public IsAddingCourse(): boolean {
    return this.isAddingCourse;
  }

  public createCourse(): ICourse[] {
    console.log('AddCourse clicked');
    this.isAddingCourse = true;
    this.checkAddCourse.next({
      isAddingCourse: this.IsAddingCourse(),
    });

    return this.mockCourses;
  }

  public deleteCourse(id: number): ICourse[] {
    this.mockCourses = this.mockCourses.filter((course: ICourse) => course.id !== id);
    return this.mockCourses;
  }

  public getCourse(id: number): ICourse {
    return this.mockCourses.find((course: ICourse) => course.id == id);
  }

  public updateCourse(id: number) {
    console.log('Updating course ' + id);
  }

  public getMaxId(): number {
    return this.mockCourses.map(course => course.id).reduce((a, b)=>Math.max(a, b));
  }

  public saveCourse(course: ICourse) {
    this.mockCourses.push(course);
    this.isAddingCourse = false;    
    this.checkAddCourse.next({
      isAddingCourse: this.IsAddingCourse(),
    });
  }

  public cancelSaving() {
    this.isAddingCourse = false;
    this.checkAddCourse.next({
      isAddingCourse: this.IsAddingCourse(),
    });
  }
}
