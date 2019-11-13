import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(duration: number): any {
    if (duration < 60) {
      return duration + ' min';
    }
    else if (duration % 60 == 0) {
      return (Math.floor(duration/60)) + ' h';
    }
    else {
      return (Math.floor(duration/60)) + ' h ' + (duration % 60) + " min";
    }
  }

}
