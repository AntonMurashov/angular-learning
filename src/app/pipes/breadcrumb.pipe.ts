import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'breadcrumb'
})
export class BreadcrumbPipe implements PipeTransform {

  transform(title: string): string {
    if (title != "") {
      return ' / ' + title;
    } else {
      return "";
    }
  }

}
