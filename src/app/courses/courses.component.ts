import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { ICourse } from './course-item/course-item.component';
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

  public addCourse() {
    console.log('AddCourse clicked');
  }

  public onDeleteCourse(id: number): void {
    this.items = this.items.filter((course: ICourse) => course.id !== id);
    this.visibleItems = this.visibleItems.filter((course: ICourse) => course.id !== id);
  }
}
