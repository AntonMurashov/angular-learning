import { Component, OnInit } from '@angular/core';
import { Sort } from 'src/app/enums/sort.enum';
import { CourseService, ICourse } from 'src/app/services/course.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { FindPipe } from 'src/app/pipes/find.pipe';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { switchMap, tap, filter, map, debounceTime } from 'rxjs/operators';
import { loadCourses, loadMore, resetCoursesCount } from 'src/app/store/courses.actions';
import { State } from 'src/app/store';
import { selectCoursesList } from 'src/app/store/courses.reducer';
import { Store, select } from '@ngrx/store';
import { getAuthInfo } from 'src/app/store/auth.reducer';
import { isAuthentificated, getAuthInfoAction } from 'src/app/store/auth.actions';

@Component({
  selector: 'angular-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  public items$: Observable<ICourse[]>;
  countInc = 10;
  sort = Sort;

  public searchStr = '';

  constructor(
    private cs: CourseService,
    private store: Store<State>,
    private breadcrumbService: BreadcrumbService,
    private find: FindPipe,
    private router: Router
  ) { }

  private refreshItems() {
    this.searchStr$.next(this.searchStr);
    this.store.dispatch(loadCourses());
  }

  private count = this.countInc;

  private searchStr$ = new Subject<string>();
/*
  private refreshItems(count: number = 0) {
    this.searchStr$.next(this.searchStr);
    this.refreshItems();
    this.breadcrumbService.changeMessage("");
  }
*/
  ngOnInit() {
    this.count = this.countInc;
    this.store.dispatch(getAuthInfoAction());
    this.items$ = this.store.pipe(select(selectCoursesList));
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
      this.store.dispatch(resetCoursesCount());      
      this.refreshItems();
    });
  }

  public loadMore() {
//    this.count += this.countInc;
    this.store.dispatch(loadMore());
//    this.refreshItems();
  }

  public search() {
    this.refreshItems();
  }
}
