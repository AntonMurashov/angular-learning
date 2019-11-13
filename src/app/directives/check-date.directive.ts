import { Directive, ElementRef, Input } from '@angular/core';
import { ICourse } from '../courses/course-item/course-item.component';

@Directive({
  selector: '[angularCheckDate]'
})
export class CheckDateDirective {

  @Input('angularCheckDate') public course: ICourse;
  constructor(private element: ElementRef) {
  }

  public ngOnChanges(): void {
    let now = new Date();
    let now14 = new Date(now.getTime() - 14 * 24 * 3600 * 1000);
    if (this.course.creationDate > now)
      this.element.nativeElement.style.borderColor = 'blue';
    if ((this.course.creationDate <= now) &&
      (this.course.creationDate >= now14))
      this.element.nativeElement.style.borderColor = 'green';
  }
}
