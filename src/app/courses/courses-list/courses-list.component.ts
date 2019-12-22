import { Component, OnInit } from '@angular/core';
import { Sort } from 'src/app/enums/sort.enum';
import { CourseService, ICourse } from 'src/app/services/course.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { FindPipe } from 'src/app/pipes/find.pipe';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'angular-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  items: ICourse[];
  items$: Observable<ICourse[]>;
  visibleItems: ICourse[];
  visibleItems$: Observable<ICourse[]>;
  sort = Sort;
  countInc = 10;

  public searchStr = '';

  constructor(private cs: CourseService, private breadcrumbService: BreadcrumbService, private find: FindPipe, private router: Router) {
  }

  private refreshItems(count: number) {
    this.cs.getCourses(0, count).subscribe(
      v => {
        this.items = v;
        this.visibleItems = this.items;
      });
  }

  ngOnInit() {
    this.refreshItems(this.countInc);
      this.breadcrumbService.changeMessage("");
  }

  public onSearchClick() {
    this.visibleItems = this.find.transform(this.items, this.searchStr);
  }

  public addCourse() {
    this.router.navigate(["./courses/new"]);
  }

  public onDeleteCourse(id: number): void {
    this.cs.deleteCourse(id).subscribe(v => {
      this.refreshItems(this.countInc);
      this.visibleItems = this.items;
    });
  }

  public onCloseAddCourse(items: ICourse[]) {
    if (items != undefined) {
      this.items = items;
      this.visibleItems = this.items;
    }
  }

  public loadMore() {
    console.log('Trying to load more');
    this.refreshItems(this.items.length + this.countInc);
  }

}
