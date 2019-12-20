import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CourseService, Course, ICourse } from 'src/app/services/course.service';
import { DateService } from 'src/app/services/date.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { BreadcrumbService } from 'src/app/services/breadcrumb.service';

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
    private courseService: CourseService,
    private dateService: DateService,
    private breadcrumbService: BreadcrumbService,
    private router: Router
  ) { }

  private navigateToList() {
    this.router.navigate(["courses"]);
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((routeParams) => {
      this.isCreate = (routeParams.id == undefined);
      if (!this.isCreate) {
        this.courseService.getCourse(routeParams.id).subscribe(v => {
          this.course = v;
          this.startDate = this.course.date;
          if (this.course != undefined) {
            this.breadcrumbService.changeMessage(this.isCreate ? "New course" : this.course.name);
            this.isNewOrEdit = true;
          } else {
            this.isNewOrEdit = false;
          }
        });
      } else {
        this.startDate = ""; //this.dateService.formatDate(new Date());
      }
    });
  }

  public isSaveDisabled(): boolean {
    return (this.course.name == '') || (this.course.name == undefined);
  }

  public onSaveClick() {
    let action: Observable<Object>;
    if (this.course.id == undefined) {
      this.courseService.getMaxId().subscribe(v => {
        this.course.id = v + 1;
      });
    }
    this.course.date = this.startDate != '' ? this.startDate : this.dateService.formatDate(new Date());
    action = this.isCreate ? this.courseService.createCourse(this.course) : this.courseService.updateCourse(this.course.id, this.course);
    action.subscribe(v => {
      console.log('calling update');
      this.navigateToList();
    });    
  }

  public onCancelClick() {
    this.navigateToList();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
