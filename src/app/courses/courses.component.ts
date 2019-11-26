import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { ICourse } from './course-item/course-item.component';
import { FindPipe } from '../pipes/find.pipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'angular-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  items: ICourse[];
  visibleItems: ICourse[];
  isAddingCourse = false;

  public searchStr = '';

  
  constructor(private cs: CourseService, private find: FindPipe) {
    this.isAddingCourse = this.cs.IsAddingCourse();
    cs.checkAddCourse.subscribe(value => { 
      this.isAddingCourse = value.isAddingCourse; 
    });
  }

  ngOnInit() {
    this.items = this.cs.findAll();
    this.visibleItems = this.items;
  }

  public onSearchClick() {
    this.visibleItems = this.find.transform(this.items, this.searchStr);
  }

  public addCourse() {
    this.items = this.cs.createCourse();
  }

  public onDeleteCourse(id: number): void {
    this.items = this.cs.deleteCourse(id);
    this.visibleItems = this.items;
  }
}
