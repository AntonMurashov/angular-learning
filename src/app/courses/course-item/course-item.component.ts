import { Component, OnInit, Input } from '@angular/core';

export class Course implements ICourse {
  id: string;
  title: string;
  creationDate: Date;
  durationMin: number;
  description: string;
}

export interface ICourse {
  id: string;
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

  constructor() { }

  ngOnInit() {
  }

}
