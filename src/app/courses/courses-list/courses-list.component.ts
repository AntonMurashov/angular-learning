import { Component, OnInit } from '@angular/core';
import { ICourse } from '../course-item/course-item.component';
import { Sort } from 'src/app/enums/sort.enum';
import { CourseService } from 'src/app/services/course.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { FindPipe } from 'src/app/pipes/find.pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'angular-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  items: ICourse[];
  visibleItems: ICourse[];
  sort = Sort;
  
  public searchStr = '';

  constructor(private cs: CourseService, private breadcrumbService: BreadcrumbService, private find: FindPipe, private router: Router) {
  }

  ngOnInit() {
    this.items = this.cs.findAll();
    this.visibleItems = this.items;
    this.breadcrumbService.changeMessage("");
    
  }

  public onSearchClick() {
    this.visibleItems = this.find.transform(this.items, this.searchStr);
  }

  public addCourse() {
    this.router.navigate(["./courses/new"]);
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
  }

}
