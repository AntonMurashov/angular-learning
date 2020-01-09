import { Component, OnInit } from '@angular/core';
import { ICourse } from 'src/app/services/course.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { Router } from '@angular/router';
import { Observable, Subject, timer } from 'rxjs';
import { map, mergeMap, debounce } from 'rxjs/operators';
import { loadCourses, loadMore, deleteCourse } from 'src/app/store/courses.actions';
import { State } from 'src/app/store';
import { selectCoursesList } from 'src/app/store/courses.reducer';
import { Store, select } from '@ngrx/store';
import { loadUserInfo } from 'src/app/store/auth.actions';

@Component({
  selector: 'angular-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  public items$: Observable<ICourse[]>;

  public searchStr = '';

  constructor(
    private store: Store<State>,
    private breadcrumbService: BreadcrumbService,
    private router: Router
  ) { 
    this.items$ = this.searchStr$.pipe(
      debounce(v => timer(v == null ? 0 : 2000)),
      map(v => v != null && v.length > 2 ? v : ''),
      mergeMap(v => this.updateCourses(v))
    );
  }

  private refreshItems() {
    this.updateCourses(this.searchStr).subscribe();
  }

  private searchStr$ = new Subject<string>();

  ngOnInit() {
    this.store.dispatch(loadUserInfo());
  }

  private updateCourses(searchStr: string): Observable<ICourse[]> {
    this.store.dispatch(loadCourses({searchStr: searchStr}));
    return this.store.pipe(select(selectCoursesList));
  }

  ngAfterViewInit() {
    this.breadcrumbService.changeMessage("");
    this.searchStr$.next(null);
  }

  public addCourse() {
    this.router.navigate(["./courses/new"]);
  }

  public onDeleteCourse(id: number): void {
    this.store.dispatch(deleteCourse({id: id}));
    this.refreshItems();
  }

  public loadMore() {
    this.store.dispatch(loadMore());
    this.refreshItems();
  }

  public search() {
    this.searchStr$.next(this.searchStr);
  }
}
