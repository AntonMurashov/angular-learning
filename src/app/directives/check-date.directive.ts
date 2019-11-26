import { Directive, ElementRef, Input } from '@angular/core';
import { ICourse } from '../courses/course-item/course-item.component';
import { Consts } from '../consts/consts';

@Directive({
  selector: '[angularCheckDate]'
})
export class CheckDateDirective {

  @Input('angularCheckDate') public course: ICourse;
  constructor(private element: ElementRef) {
  }

  public ngOnChanges(): void {
    let now = new Date();
    let now14 = new Date(now.getTime() - 14 * Consts.HRS_IN_DAY * Consts.MIN_IN_HOUR * Consts.SEC_IN_MIN * Consts.MSEC_IN_SEC);
    if (this.course.creationDate > now) {
      this.element.nativeElement.style.borderColor = 'blue';
    }
    if ((this.course.creationDate <= now) &&
      (this.course.creationDate >= now14)) {
      this.element.nativeElement.style.borderColor = 'green';
    }
  }
}
