import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'angular-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  title = '';
  description = ''
  startDate = new Date().toLocaleDateString('ru-RU');
  duration = null;
  authors = '';

  constructor(private courseService: CourseService) { }

  ngOnInit() {

  }

  public isSaveDisabled(): boolean {
    return (this.title == '');
  }

  public onSaveClick() {
    this.courseService.saveCourse({
      id: this.courseService.getMaxId() + 1,
      title: this.title,
      description: this.description,
      creationDate: this.startDate != '' ? this.parseDate(this.startDate) : new Date(),
      durationMin: this.duration,
      topRated: false
    });
  }

  public onCancelClick() {
    this.courseService.cancelSaving();
  }

  private parseDate(date: string): Date {
    return new Date(date.substr(3, 2)
      .concat('/')
      .concat(date.substr(0, 2))
      .concat('/')
      .concat(date.substr(6, 4))
    );
  }
}
