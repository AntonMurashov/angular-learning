import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { ICourse, Course } from './course-item/course-item.component';
import { FindPipe } from '../pipes/find.pipe';

@Component({
  selector: 'angular-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  public items: ICourse[];
  public visibleItems: ICourse[];

  public searchStr = '';

  constructor(private cs: CourseService, private find: FindPipe) {
  }

  ngOnInit() {
    this.items = this.cs.findAll();
    this.visibleItems = this.items;
  }

  public onSearchClick() {
    this.visibleItems = this.find.transform(this.items, this.searchStr);
  }

  private getMockCourse(): ICourse {
    let course = new Course();
    course.id = this.cs.getMaxId() + 1;
    course.title = 'Test course ' + course.id;
    course.durationMin = 60;
    course.creationDate = new Date();
    return course;
  }

  public addCourse() {
    this.items = this.cs.createCourse(this.getMockCourse());
    this.visibleItems = this.items;
  }

  public onDeleteCourse(id: number): void {
    this.items = this.cs.deleteCourse(id);
    this.visibleItems = this.items;
  }
}
