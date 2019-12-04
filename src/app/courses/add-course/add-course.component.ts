import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { DateService } from 'src/app/services/date.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ICourse, Course } from '../course-item/course-item.component';
import { Subscription } from 'rxjs';
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

  ngOnInit() {
    this.subscription = this.route.params.subscribe((routeParams) => {
      this.isCreate = (routeParams.id == undefined);
      this.startDate = ((this.course.creationDate == undefined) ? new Date() : this.course.creationDate).toLocaleDateString('ru-RU');
      if (!this.isCreate) {
        this.course = this.courseService.getCourse(routeParams.id);
        if (this.course != undefined) {
          this.breadcrumbService.changeMessage(this.isCreate ? "New course" : this.course.title);
          this.isNewOrEdit = true;
        } else {
          this.isNewOrEdit = false;
        }
      }
    });
  }

  public isSaveDisabled(): boolean {
    return (this.course.title == '') || (this.course.title == undefined);
  }

  public onSaveClick() {
    if (this.course.id == undefined) {
      this.course.id = this.courseService.getMaxId() + 1;
    }
    this.course.creationDate = this.startDate != '' ? this.dateService.parseDate(this.startDate) : new Date();
    if (this.isCreate) {
      this.courseService.createCourse(this.course);
    } else {
      this.courseService.updateCourse(this.course.id, this.course);
    }

    this.router.navigate(["courses"]);
  }

  public onCancelClick() {
    this.router.navigate(["courses"]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
