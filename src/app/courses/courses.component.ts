import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'angular-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
/*
  items: ICourse[];
  visibleItems: ICourse[];
  sort = Sort;
  
  public searchStr = '';

  constructor(private cs: CourseService, private breadcrumbService: BreadcrumbService, private find: FindPipe, private router: Router) {
  }
*/
  ngOnInit() {
    /*this.items = this.cs.findAll();
    this.visibleItems = this.items;
    this.breadcrumbService.changeMessage("");*/
    
  }
/*
  public onSearchClick() {
    this.visibleItems = this.find.transform(this.items, this.searchStr);
  }

  public addCourse() {
    this.router.navigate(["courses/new"]);
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
  }*/
}
