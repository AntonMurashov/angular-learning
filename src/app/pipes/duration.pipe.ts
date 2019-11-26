import { Pipe, PipeTransform } from '@angular/core';
import { Consts } from '../consts/consts';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(duration: number): string {
    if (duration < Consts.MIN_IN_HOUR) {
      return duration + ' min';
    }
    if (duration % Consts.MIN_IN_HOUR == 0) {
      return (Math.floor(duration/Consts.MIN_IN_HOUR)) + ' h';
    }
    return (Math.floor(duration/Consts.MIN_IN_HOUR)) + ' h ' + (duration % 60) + " min";
  }

}
