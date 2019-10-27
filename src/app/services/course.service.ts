import { Injectable } from '@angular/core';
import { Course, ICourse } from '../courses/course-item/course-item.component';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor() { }

  private getMockCourses(): Course[] {
    return [
      {
        id: 1,
        title: "Video Course 1. Name 1",
        creationDate: new Date(2019, 10, 19),
        durationMin: 90,
        description: "Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college's classes. They're published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester."
      },
      {
        id: 2,
        title: "Video Course 2. Name 2",
        creationDate: new Date(2019, 9, 7),
        durationMin: 120,
        description: "Learn about where you can find course descriptions, what information they include, how they work, and details about various components of a course description. Course descriptions report information about a university or college's classes. They're published both in course catalogs that outline degree requirements and in course schedules that contain descriptions for all courses offered during a particular semester."
      },
      {
        id: 3,
        title: "Video Course 3. Name 3",
        creationDate: new Date(2018, 7, 21),
        durationMin: 60,
        description: "description3 description3 description3"
      },
      {
        id: 4,
        title: "Video Course 4. Name 4",
        creationDate: new Date(2017, 1, 5),
        durationMin: 90,
        description: "description4"
      },
      {
        id: 5,
        title: "Video Course 5. Name 5",
        creationDate: new Date(2019, 2, 15),
        durationMin: 120,
        description: "description5"
      }
    ];
  }

  public findAll(): ICourse[] {
    return this.getMockCourses();
  }
}
