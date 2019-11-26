import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  public parseDate(date: string): Date {
    return new Date(date.substr(3, 2)
      .concat('/')
      .concat(date.substr(0, 2))
      .concat('/')
      .concat(date.substr(6, 4))
    );
  }
}
