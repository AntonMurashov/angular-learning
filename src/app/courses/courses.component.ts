import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { ICourse } from './course-item/course-item.component';

@Component({
  selector: 'angular-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  public items: ICourse[];

  public searchStr = '';

  constructor(private cs: CourseService) {
  }

  ngOnInit() {
    this.items = this.cs.findAll();
  }

  public onSearchClick() {
    console.log(this.searchStr);
  }

  public addCourse() {
    console.log('AddCourse clicked');
  }

  public onDeleteCourse(id: number): void {
    this.items = this.items.filter((course: ICourse) => course.id !== id);
    console.log(id);
  }
}
