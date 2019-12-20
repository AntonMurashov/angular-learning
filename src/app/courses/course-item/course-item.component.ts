import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { ICourse } from 'src/app/services/course.service';

@Component({
  selector: 'angular-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CourseItemComponent implements OnInit {

  @Input()
  public item: ICourse;
  @Output() onEdit = new EventEmitter<ICourse>();
  @Output() onDelete = new EventEmitter<number>();

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  public delete(): void {
    if (confirm("Do you really want to delete course " + this.item.name + "?")) {
      this.onDelete.emit(this.item.id);
    }
  }

  public edit(): void {
    this.router.navigate(["courses", this.item.id]);
  }
}
