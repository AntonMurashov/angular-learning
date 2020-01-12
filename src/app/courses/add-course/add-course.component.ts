import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Course, ICourse } from 'src/app/services/course.service';
import { DateService } from 'src/app/services/date.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';
import { tap, mergeMap, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/store';
import { selectMaxCourseId, selectCourse } from 'src/app/store/courses.reducer';
import { getCourse, createCourse, updateCourse } from 'src/app/store/courses.actions';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';

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

  form: FormGroup;

  private createForm(model: ICourse): FormGroup {
    return this.fb.group(model);
  }

  constructor(private route: ActivatedRoute,
    private dateService: DateService,
    private breadcrumbService: BreadcrumbService,
    private router: Router,
    private store: Store<State>,
    private fb: FormBuilder
  ) { 
    this.form = fb.group({
      "name": ["", [Validators.required, Validators.maxLength(50)]],
      "description": ["", [Validators.required, Validators.maxLength(500)]],
      "date": ["", Validators.required],
      "length": ["", Validators.required],
      "authors": ["", Validators.required]
    });
  }

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
              this.name.setValue(course.name);
              this.description.setValue(course.description);
              this.date.setValue(course.date);
              this.length.setValue(course.length);
              this.authors.setValue(course.authors);
              //this.form.setValue(course);
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
  /*    this.form.valueChanges.pipe(
        map((value) => {
          console.log(value);
          console.log(this.name);
        })).subscribe();*/
  }

  public isSaveDisabled(): boolean {
    return (this.course.name == '') || (this.course.name == undefined);
  }

  public onSaveClick() {
    console.log('saving');
    this.course = {
      ...this.course,
      ...this.form.value
    };
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

  get name() { return this.form.get("name"); }
  get description() { return this.form.get("description"); }
  get date() { return this.form.get("date"); }
  get length() { return this.form.get("length"); }
  get authors() { return this.form.get("authors"); }
}
