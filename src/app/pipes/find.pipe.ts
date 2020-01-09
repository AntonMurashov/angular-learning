import { Pipe, PipeTransform } from '@angular/core';
import { ICourse } from '../services/course.service';

@Pipe({
  name: 'find'
})
export class FindPipe implements PipeTransform {

  transform(courses: ICourse[], searchStr: string): ICourse[] {
    return courses.filter(course => course.name.includes(searchStr));
  }

}
