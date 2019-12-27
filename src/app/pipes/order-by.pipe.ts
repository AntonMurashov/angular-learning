import { Pipe, PipeTransform } from '@angular/core';
import { Sort } from '../enums/sort.enum';
import { ICourse } from '../services/course.service';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

    transform(courses: ICourse[], column: string, order = Sort.asc): any {
      if (courses == null)
        return [];
      let compareResult = (order == Sort.asc) ? 1 : -1;
    return courses.slice().sort((a, b) => a[column] > b[column] ? compareResult : -compareResult);
  }

}
