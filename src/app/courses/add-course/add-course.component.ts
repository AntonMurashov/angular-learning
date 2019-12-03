import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'angular-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  @Output() onClosePage = new EventEmitter();
  
  title = '';
  description = ''
  startDate = new Date().toLocaleDateString('ru-RU');
  duration = null;
  authors = '';

  constructor(private courseService: CourseService, private dateService: DateService) { }

  ngOnInit() {

  }

  public isSaveDisabled(): boolean {
    return (this.title == '');
  }

  public onSaveClick() {
    this.courseService.createCourse({
      id: this.courseService.getMaxId() + 1,
      title: this.title,
      description: this.description,
      creationDate: this.startDate != '' ? this.dateService.parseDate(this.startDate) : new Date(),
      durationMin: this.duration,
      topRated: false
    });
    this.onClosePage.emit(this.courseService.findAll());
  }

  public onCancelClick() {
    this.onClosePage.emit();
  }
}
