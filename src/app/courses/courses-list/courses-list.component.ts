import { Component, OnInit } from '@angular/core';
import { Sort } from 'src/app/enums/sort.enum';
import { CourseService, ICourse } from 'src/app/services/course.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { FindPipe } from 'src/app/pipes/find.pipe';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { switchMap, tap, filter, map, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'angular-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  public items$: Observable<ICourse[]>;
  sort = Sort;
  countInc = 10;

  public searchStr = '';

  constructor(private cs: CourseService, private breadcrumbService: BreadcrumbService, private find: FindPipe, private router: Router) {
  }

  private count = this.countInc;

  private searchStr$ = new Subject<string>();

  private refreshItems(count: number = 0) {
    this.searchStr$.next(this.searchStr);
  }

  ngOnInit() {
    this.count = this.countInc;
    this.breadcrumbService.changeMessage("");
    this.items$ = this.searchStr$.pipe(
      debounceTime(1000),
      map(v => v.length > 2 ? v : ''),
      switchMap(v => this.cs.getCourses(0, this.count, v))
    );
  }

  ngAfterViewInit() {
    this.refreshItems();
  }

  public addCourse() {
    this.router.navigate(["./courses/new"]);
  }

  public onDeleteCourse(id: number): void {
    this.cs.deleteCourse(id).subscribe(v => {
      this.refreshItems();
    });
  }

  public loadMore() {
    this.count += this.countInc;
    this.refreshItems();
  }

  public search() {
    this.refreshItems();
  }
}
