import { Component, OnInit, Input} from '@angular/core';
import { CourseService } from '../services/course.service';
import { ICourse, Course } from './course-item/course-item.component';
import { FindPipe } from '../pipes/find.pipe';
import { Sort } from '../enums/sort.enum';

@Component({
  selector: 'angular-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  @Input() isAddingCourse = false;

  items: ICourse[];
  visibleItems: ICourse[];
  sort = Sort;
  
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
    this.isAddingCourse = true;
  }

  public onDeleteCourse(id: number): void {
    this.items = this.cs.deleteCourse(id);
    this.visibleItems = this.items;
  }

  public onCloseAddCourse(items: ICourse[]) {
    if (items != undefined) {
      this.items = items;
      this.visibleItems = this.items;
    }
    this.isAddingCourse = false;
  }
}
