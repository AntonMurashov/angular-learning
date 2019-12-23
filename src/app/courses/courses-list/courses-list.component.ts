import { Component, OnInit } from '@angular/core';
import { Sort } from 'src/app/enums/sort.enum';
import { CourseService, ICourse } from 'src/app/services/course.service';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { FindPipe } from 'src/app/pipes/find.pipe';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadCourses1 } from 'src/app/store/courses.actions';
import { CoursesState } from 'src/app/store/courses.state';
import { reducers } from 'src/app/store';

@Component({
  selector: 'angular-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  items: ICourse[];
  //  items$: Observable<ICourse[]>;
  visibleItems: ICourse[];
  visibleItems$: Observable<ICourse[]>;
  sort = Sort;
  countInc = 10;

  items$: Observable<ICourse[]> = this.store.select(state => 
    {
      console.log(this.store);
      console.log(state);
      console.log('selecting from store: ' + reducers);
      return state.courses;
    });

  public searchStr = '';

  constructor(
    private cs: CourseService,
    private store: Store<CoursesState>,
    private breadcrumbService: BreadcrumbService,
    private find: FindPipe,
    private router: Router
  ) { }

  private refreshItems(count: number) {
    this.items$.subscribe(
      v => {
        console.log(v);
        this.items = v;
        this.visibleItems = this.items;
      });
  }

  ngOnInit() {
    console.log('ngOnInit');
    this.store.dispatch(loadCourses1());
    console.log('after dispatch');
    this.refreshItems(this.countInc);
    console.log('after refresh');
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
