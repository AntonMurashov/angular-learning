import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor(private pipe: DatePipe) { }

  public formatDate(date: Date): string {
    return date.toLocaleDateString('ru-RU');
  }

public convertToISO(date: string): string {
  var parts = date.split('/');
  return (new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]))).toISOString(); 
}

  public convertFromISO(date: string): string {
    return this.pipe.transform(date, 'dd/MM/yyyy');
  }
}
