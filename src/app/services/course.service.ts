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
        id: "id1",
        title: "title1",
        creationDate: new Date(2019, 10, 19),
        durationMin: 90,
        description: "description1"
      },
      {
        id: "id2",
        title: "title2 title2",
        creationDate: new Date(2019, 9, 7),
        durationMin: 120,
        description: "description2 description2"
      },
      {
        id: "id3",
        title: "title3 title3 title3",
        creationDate: new Date(2018, 7, 21),
        durationMin: 60,
        description: "description3 description3 description3"
      },
      {
        id: "id4",
        title: "title4",
        creationDate: new Date(2017, 1, 5),
        durationMin: 90,
        description: "description4"
      },
      {
        id: "id5",
        title: "title5",
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
