import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export class Course implements ICourse {
  id: number;
  title: string;
  creationDate: Date;
  durationMin: number;
  description: string;
}

export interface ICourse {
  id: number;
  title: string;
  creationDate: Date;
  durationMin: number;
  description: string;
}

@Component({
  selector: 'angular-course-item',
  templateUrl: './course-item.component.html',
  styleUrls: ['./course-item.component.scss']
})
export class CourseItemComponent implements OnInit {
  
  @Input()
  public item: ICourse;
  @Output('onDeleteCourse') onDelete: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  public delete(): void {
    this.onDelete.emit(this.item.id);
  }

  public edit(): void {
    console.log('Edit on course ' + this.item.id + ' clicked');
  }
}
