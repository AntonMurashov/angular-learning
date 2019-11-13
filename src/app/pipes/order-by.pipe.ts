import { Pipe, PipeTransform } from '@angular/core';
import { ICourse } from '../courses/course-item/course-item.component';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(courses: ICourse[], column: string, order: 'asc' | 'desc' = 'asc'): any {
    let compareResult = (order == 'asc') ? 1 : -1;
    return courses.sort((a, b) => a[column] > b[column] ? compareResult : -compareResult);
  }

}
