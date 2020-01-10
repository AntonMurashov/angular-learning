import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Course, ICourse } from 'src/app/services/course.service';
import { DateService } from 'src/app/services/date.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { tap, mergeMap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/store';
import { selectMaxCourseId, selectCourse } from 'src/app/store/courses.reducer';
import { getCourse, createCourse, updateCourse } from 'src/app/store/courses.actions';

@Component({
  selector: 'angular-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  routeParams: {
    id?: number;
  } = {};

  course = new Course();
  private subscription: Subscription;
  isCreate: boolean;
  isNewOrEdit: boolean = true;
  @Output() onOpenPage = new EventEmitter<ICourse>();

  startDate: string;

  constructor(private route: ActivatedRoute,
    private dateService: DateService,
    private breadcrumbService: BreadcrumbService,
    private router: Router,
    private store: Store<State>
  ) { }

  private navigateToList() {
    this.router.navigate(["courses"]);
  }

  ngOnInit() {
    this.subscription = this.route.params.pipe(
      tap((routeParams) => {
        this.isCreate = (routeParams.id == undefined);
        if (!this.isCreate) {
          this.store.dispatch(getCourse({ id: routeParams.id }));
        }
      }),
      mergeMap(() => this.store.pipe(
        select(selectCourse),
        tap((course) => {
          if (!this.isCreate) {
            if (course != undefined) {
              this.course = JSON.parse(JSON.stringify(course));
              this.startDate = this.course.date;
              this.breadcrumbService.changeMessage(this.course.name);
              this.isNewOrEdit = true;
            } else {
              this.isNewOrEdit = false;
            }
          } else {
            this.breadcrumbService.changeMessage("New course");
            this.startDate = ""; //this.dateService.formatDate(new Date());
          }
        })))).subscribe();
  }

  public isSaveDisabled(): boolean {
    return (this.course.name == '') || (this.course.name == undefined);
  }

  public onSaveClick() {
    let action: Observable<Object>;
    if (this.course.id == undefined) {
      this.store.pipe(
        select(selectMaxCourseId),
        tap(v => this.course.id = v + 1)
      );
    }
    this.course.date = this.startDate != '' ? this.startDate : this.dateService.formatDate(new Date());
    this.store.dispatch(this.isCreate ?
      createCourse({ course: this.course }) :
      updateCourse({ id: this.course.id, course: this.course })
    );
    this.navigateToList();
  }

  public onCancelClick() {
    this.navigateToList();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
