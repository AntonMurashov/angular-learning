import { Pipe, PipeTransform } from '@angular/core';
import { ICourse } from '../courses/course-item/course-item.component';
import { Sort } from '../enums/sort.enum';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

    transform(courses: ICourse[], column: string, order = Sort.asc): any {
      let compareResult = (order == Sort.asc) ? 1 : -1;
    return courses.sort((a, b) => a[column] > b[column] ? compareResult : -compareResult);
  }

}
