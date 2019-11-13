import { Pipe, PipeTransform } from '@angular/core';
import { ICourse } from '../courses/course-item/course-item.component';

@Pipe({
  name: 'find'
})
export class FindPipe implements PipeTransform {

  transform(courses: ICourse[], searchStr: string): any {
    return courses.filter(course => course.title.includes(searchStr));
  }

}
