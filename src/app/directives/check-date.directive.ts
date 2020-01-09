import { Directive, ElementRef, Input } from '@angular/core';
import { Consts } from '../consts/consts';
import { ICourse } from '../services/course.service';
import { DateService } from '../services/date.service';


@Directive({
  selector: '[angularCheckDate]'
})
export class CheckDateDirective {

  @Input('angularCheckDate') public course: ICourse;
  constructor(private element: ElementRef, private dateService: DateService) {
  }

  public ngOnChanges(): void {
    let now = new Date();
    let now14 = new Date(now.getTime() - 14 * Consts.HRS_IN_DAY * Consts.MIN_IN_HOUR * Consts.SEC_IN_MIN * Consts.MSEC_IN_SEC);
    if (this.dateService.parseDate(this.course.date) > now) {
      this.element.nativeElement.style.borderColor = 'blue';
    }
    if ((this.dateService.parseDate(this.course.date) <= now) &&
      (this.dateService.parseDate(this.course.date) >= now14)) {
      this.element.nativeElement.style.borderColor = 'green';
    }
  }
}
