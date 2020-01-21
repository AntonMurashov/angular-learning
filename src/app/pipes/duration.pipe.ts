import { Pipe, PipeTransform } from '@angular/core';
import { Consts } from '../consts/consts';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(length: string): string {
    if (!length) {
      return null;
    }
    let duration = +length;
    if ((isNaN(duration)) || (duration <= 0)) {
      return null;
    }
    if (duration < Consts.MIN_IN_HOUR) {
      return duration + ' min';
    }
    if (duration % Consts.MIN_IN_HOUR == 0) {
      return (Math.floor(duration/Consts.MIN_IN_HOUR)) + ' h';
    }
    return (Math.floor(duration/Consts.MIN_IN_HOUR)) + ' h ' + (duration % 60) + " min";
  }

}
