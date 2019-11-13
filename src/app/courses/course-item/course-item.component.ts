import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

export class Course implements ICourse {
  id: number;
  title: string;
  creationDate: Date;
  durationMin: number;
  description: string;
  topRated: boolean;
}

export interface ICourse {
  id: number;
  title: string;
  creationDate: Date;
  durationMin: number;
  description: string;
  topRated: boolean;
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

  constructor() {
    console.log('Constructor started');
  }

  ngOnInit() {
    console.log('ngOnInit called');
  }

  public ngOnChanges(changes: SimpleChanges): void {
    console.log('OnChanges ', changes);
  }

  public delete(): void {
    this.onDelete.emit(this.item.id);
  }

  public edit(): void {
    console.log('Edit on course ' + this.item.id + ' clicked');
  }
}
